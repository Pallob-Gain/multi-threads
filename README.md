# NodeJS Multithreading Library

Introducing NodeJS Multithreading Library - a high-performance, lightweight library designed to make multithreading in NodeJS simple and easy. With this library, you can take advantage of the power of multithreading to improve the performance of your NodeJS applications. Whether you're working on a complex server-side application or just need to run multiple tasks simultaneously, this library has got you covered.  The library utilizes JavaScript's built-in Worker threads to create multiple threads, each with its own event loop and memory heap. This means you can run multiple independent tasks in parallel without affecting the main thread and blocking the event loop.  The library is easy to use and comes with a simple API that makes it easy to create and manage worker threads. It also includes features such as error handling and communication between threads, making it a complete solution for multithreading in NodeJS.  With NodeJS Multithreading Library, you can easily speed up your applications, improve their responsiveness, and make them more scalable. So, why wait? Start taking advantage of multithreading in NodeJS today with this library!

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install foobar.

```bash
npm install multi-threads
```

## Usage

```javascript
import thread from 'multi-threads';

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
```

## Features

- Utilizes JavaScript's built-in Worker threads to create multiple threads
- Each thread has its own event loop and memory heap
- Easy to use API for creating and managing worker threads
- Error handling and communication between threads included
- Improves performance and responsiveness of NodeJS applications
- Makes applications more scalable

## Version History

- 1.0.3: Initial release.

## License

This package is released under the [MIT](https://choosealicense.com/licenses/mit/) License.
