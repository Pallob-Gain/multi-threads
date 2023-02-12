import thread from '../lib/index.js';

async function thread_scope(){
    let count=0;
    while(true){
        console.log(`Thread ${this.name} Counting ${count}`);
        count++;

        await this.sleep(1000);
    }
}


thread.open(thread_scope,{name:'thread 1'}); //thread 1 with a scope
thread.open(thread_scope,{name:'thread 2'}); //thread 2 with the same scope