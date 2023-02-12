import thread from '../lib/index.js';

//split task thread
async function threadTask(){
    let count=this.start;
    while(count<this.end){
        count++;
    }
    return count;
}


async function thread_spliter(){
    console.time('Required Time');

    const THREAD_USE=4;
    const TOTOAL_COUNT=20E+9; //20 billion

    const threads=[];
    for(let i=0;i<THREAD_USE;i++){
        //pass the split task to thread
        threads.push(thread.open(threadTask,{start:0,end:TOTOAL_COUNT/THREAD_USE}));
    }
    
    const counts=await Promise.all(threads); //await to finish the all thread process
    let total_count=counts.reduce( (accumulator, currentValue) => accumulator + currentValue,0); //summing the counts

    console.log('Counted:',total_count);
    console.timeEnd('Required Time');
}

thread_spliter();

