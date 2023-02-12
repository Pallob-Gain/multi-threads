import { Worker} from 'node:worker_threads';
import path from 'node:path';
import url from 'node:url';


const moduleUrl = new URL(import.meta.url);
const [blank,...modulePath] = moduleUrl.pathname.split('');

const moduleDirectory = path.dirname(modulePath.join(''));
const worker_path=decodeURI(path.resolve(moduleDirectory,'./worker.js'));

class instantThread{
    promise;
    worker;

    constructor(worker,promise){
        this.worker=worker;
        this.promise=promise;
    }

    then(callback){
        if(this.promise)this.promise.then(callback);  
        return this.promise;
    }

    catch(callback){
        if(this.promise)this.promise.catch(callback);
        return this.promise;  
    }

    async close(){
        if(this.worker){
            await this.worker.terminate();
        }
    }

}

class thread{
    

    static open(callback,local_data={}){
        
        //if the worker thread close by force it will not return any data because the function is not ending
        let worker=new Worker(worker_path,{workerData:local_data});

        let promise=new Promise((resolve,reject)=>{
            try{
                
                worker.once('message',resolve);
                
                worker.on('error', reject);

                worker.on('exit', (code) => {
                    if (code !== 0 && code !== 1)reject(new Error(`thread exit code ${code}`));
                    else resolve();
                });

                worker.postMessage({callback:callback.toString()});

            }
            catch(err){
                reject(err);
            }
        });
        
        return  new instantThread(worker,promise);
    }

}

export default thread;