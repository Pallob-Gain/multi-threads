import thread from '../lib/index.js';

//thread open with Thread function 1
thread.open(async function(){
    let count=0;
    while(true){
        console.log(`Thread 1 Counting ${count}`);
        count++;
        if(count==5){
           // await this.close(); //close also can end this thread directly, but will return null to the host
           break;
        }
        await this.sleep(1000);
    }
    return {name:'pallob'};
}).then(data=>{
    console.log('Thread 1 data:',data);
}).catch(err=>console.error('Thread 1 error:',err));

//Thread Function 2
async function runX(){
    console.log('Test name:',this.name); //accessing name

    let count=0;
    while(true){
        console.log(`Thread X Counting ${count}`);
        count++;

        await this.sleep(1000);
    }
}

//run the thread
var th=thread.open(runX,{name:'pallob gain'}); //passing local data

th.then(()=>{
  console.log('Thread 2 data close.');
}).catch(err=>console.error('Thread 2 error:',err));


setTimeout(()=>{
    
    th.close(); //closing thread

},2000); //after 10 sec