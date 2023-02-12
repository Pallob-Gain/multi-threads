import thread from '../lib/index.js';

//this will host a new thread
async function runX(){
    console.log('Test name:',this.name); //accessing  name

    let count=0;
    while(true){
        console.log(`Thread  Counting ${count}`);
        count++;

        await this.sleep(1000);
    }
}

thread.open(runX,{name:'pallob gain'}); //passing local data