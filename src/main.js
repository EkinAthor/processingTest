import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';

import { createStore, applyMiddleware } from 'redux';
import appReducer  from './reducers/reducers';

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import ChatContainer from './containers/ChatContainer';
import LastMessageContainer from './containers/LastMessageContainer';

import { updateMasks, updateColumns, updateDistinct, saveStore, saveFile, initializeStore, initializeFiles, fetchChats,updateFiles,updateNullCount,addFile,updateFreq } from './actions/asyncActions';
import { selectFile } from './actions/actions';

import { data } from '../server/stores/technical_md';

//-----------------
//
import FileContainer from './containers/FileContainer';
import FileDetailContainer from './containers/FileDetailContainer';

import { DataStatistics, NullMetrics, FrequencyMetrics } from './metrics/metrics.js';


import io from 'socket.io-client';


//let socket = io("http://localhost:9999");


//store without middleware
//let store = createStore(appReducer);

//store with middleware
const createStroreWithMiddleware = applyMiddleware(
	thunkMiddleware, api
	)(createStore);

const store = createStroreWithMiddleware(appReducer);

let rootElement = document.getElementById('example');

/*
<Provider store={store}>
		<ChatContainer/>
	</Provider>
	<Provider store={store}>
	<LastMessageContainer/>
	</Provider>
	<Provider store={store}>
	<FileContainer/>
	</Provider>
 */

render( 
	<div>
	
	
		<FileDetailContainer store={store}/>
	
	</div>
	,
	rootElement
	);

//store.dispatch(fetchChats());
var x =window.location.protocol;
switch(x) {
	case 'file:':
		store.dispatch(updateFiles(data));
		break;
	default: 
		//store.dispatch(initializeStore());
		store.dispatch(initializeFiles());
}


store.dispatch(updateNullCount('1234567890',[
	{nullCount: {null: 100, nonNull: 200 }}
	]));

/*
socket.on('updateNullCount', data=> {
	store.dispatch(updateNullCount(data.gid, data.counts));
});*/



var dropZone = document.getElementById('files');
dropZone.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
/*
document.getElementById('files').addEventListener('dragenter', function(e) {
	 e.stopPropagation();
        e.preventDefault();
	dropZone.style.display='block';
});
document.getElementById('files').addEventListener('dragleave', function(e) {
	 e.stopPropagation();
        e.preventDefault();
	dropZone.style.display='none';
});
*/


/*document.getElementById("fileInput").addEventListener("change", function() {
	var file = document.getElementById("fileInput").files[0];*/
dropZone.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var file = files[0];

	var j = new ThreadedFileProcessor({file:file, threaded: false, ignoreFirstLine: true, chunkSize: 4096, logging: false, scriptFilesLocation: "../lib", 
									metadata: {fileMetadata: {lineSeparator: "\n",fieldSeparator: ";", ignoreFields: true, stringQualifier: "\"", parser: "csv",stringQualifierEscape: "\"", treatAllAsStrings: true}
																							
											}
	});
	j.on("end", function(counter) {
		console.log(counter);
	});

	var cnt = 0;
	var gid;
	var nullObj;
	var NM;
	var FM;
	var DS;
	var updateInterval;
	var updateFreqInterval;
	var updateMaskInterval;
	var columns ;
	var flp = false;
	var firstLine;
	j.on("parsedLine", function(line) {
		if(cnt == 0) {
			//This part is just for demonstration. Create the file object here and save it to store
			gid = Math.floor((Math.random() * 10000) + 1).toString();
			
			columns = line.fields.map((field,index)=> {
								return {
									name: 'Field_'+index,
									dataType: 'String',
									label: 'Field_'+index,
									eid: gid+"_"+Math.floor((Math.random() * 10000) + 1).toString()
								};
							});
			let fileData = Object.assign({},
					{
						technicalMetadata: {
							info: {
								gid: gid,
								created: file.lastModifiedDate,
								name: file.name,
								label: file.name,
								type: file.type

							},
							columns: columns
						}
					},
					{
						businessMetadata: {
							gid: gid,
							elements: columns.map(col=>{
								return {
									data_type: col.dataType,
									eid: col.eid,
									label: col.label,
									nullCount: {
										null: 0,
										nonNull: 0
									}
								};
							})
						}
					});
			NM = new NullMetrics(columns);
			FM = new FrequencyMetrics(columns);
			DS = new DataStatistics(columns);

			store.dispatch(addFile(fileData));
			store.dispatch(selectFile(gid));
			//setInterval(function(){store.dispatch(updateNullCount(gid,nullObj));},50);
			updateInterval = setInterval(function(){store.dispatch(updateNullCount(gid,NM.nullObject));},50);
			updateFreqInterval = setInterval(function(){store.dispatch(updateFreq(gid,FM.fields.map(field=>{
				return {freq: Array.from(field.freqTmp).map(elem=>{
					return {label: elem[0], value: elem[1]};
				})};

			})));
			store.dispatch(updateDistinct(gid, FM.distinctCount));
			},50);
			updateMaskInterval = setInterval(function(){store.dispatch(updateMasks(gid,DS.frequency.fields.map(field=>{
				return {masks: Array.from(field.freqTmp).map(elem=>{
					return {label: elem[0], value: elem[1]};
				})};

			})));
			
			},50);

		}
		if(flp) {
			var newColumns = columns.map((column,id) => {
			return Object.assign({},column, {name:firstLine.fields[id].value, label: firstLine.fields[id].value});
			});
			store.dispatch(updateColumns(gid,newColumns));
			flp = false;
		}
		cnt++;
		//nullObj = checkNulls(line.fields, nullObj);
		NM.checkNulls(line.fields);
		FM.updateFrequencies(line.fields);
		DS.updateStatistics(line.fields);
		/*store.dispatch(updateNullCount(gid,[
		{nullCount: {null: 0, nonNull: cnt }}
		]));*/
		//store.dispatch(updateNullCount(gid,nullObj));

	});	
	j.on("firstLineProcessed", function(line) {
		flp = true;
		firstLine= line;
	});
	j.on('end', function() {
		store.dispatch(updateNullCount(gid,NM.nullObject));
		clearInterval(updateInterval);
		clearInterval(updateFreqInterval);
		clearInterval(updateMaskInterval);
		store.dispatch(updateFreq(gid,FM.fields.map(field=>{
				return {freq: Array.from(field.freqTmp).map(elem=>{
					return {label: elem[0], value: elem[1]};
				})};
			})));
		store.dispatch(updateMasks(gid,DS.frequency.fields.map(field=>{
				return {masks: Array.from(field.freqTmp).map(elem=>{
					return {label: elem[0], value: elem[1]};
				})};

			})));
		store.dispatch(updateDistinct(gid, FM.distinctCount));
		/*console.log(FM.fields.map(field=>{
				return {freq: Array.from(field.freqTmp).map(elem=>{
					return {label: elem[0], value: elem[1]};
				})};
			}));
		console.log(NM.nullObject);*/
		//console.log(FM.distinctCount);
		//console.log(DS.frequency.fields);
		switch(window.location.protocol) {
			case 'file:':
				console.log('local file system: not saving cache');
				break;
			default: 
				//store.dispatch(saveStore(store.getState()));
				var st = store.getState();
				var f = store.getState().files.find(o=>o.technicalMetadata.info.gid == gid);
				store.dispatch(saveFile(f));
		}
		

	});
	j.start();
});


/*
function createNullObject(elements) {
	return elements.map(element=>{
		return {nullCount: {null:0,nonNull:0}};
	});
};

function checkNulls(fields, nullObject) {
	if(fields.length == nullObject.length) {
		return nullObject.map((nobj,index)=>{
			if (fields[index].value == null || fields[index].value == "") {
				return {nullCount: {null: nobj.nullCount.null + 1, nonNull: nobj.nullCount.nonNull}};
			} else {
				return {nullCount: {null: nobj.nullCount.null, nonNull: nobj.nullCount.nonNull  + 1}};
			}
		});
	} else {
		return nullObject;
	} 
}
*/