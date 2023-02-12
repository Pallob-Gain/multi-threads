import {parentPort,workerData} from 'node:worker_threads';

//const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;


function close(exitcode=0){
    process.exit(exitcode);
}

function sleep(time){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,time);
    });
}


parentPort.once('message', async ({callback}) => {
    
    var sys_runner=new Function(`;
        let {close,sleep}=this;
        return (${callback}).call(this);
        `);
   
    let result=await sys_runner.call(Object.assign(workerData,{
        close:close,
        sleep:sleep
    }));
    
    parentPort.postMessage(result);
    process.exit(0);
});

  
  
  