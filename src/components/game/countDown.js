import React,{useState,useEffect} from 'react'

export default function countDown(props)
{
    const [counter,setCounter] = useState(props.time);
    console.log(props.countDown);
    // let id;
    // if(props.countDown)
    // {
    //     if(counter == 0)
    //     {
    //        // props.endGame();
    //         setCounter(props.time);
    //         //clearTimeout(id);
    //     } 
    //     if(counter > 0){
    //         if(counter - 1 == 0)
    //         {
    //            // props.endGame();
    //         }
    //        id = setTimeout(() => setCounter(counter - 1), 1000);
    //     }
    // }
    // useEffect(()=>{
    //     setCounter(props.time);
    // },[props.countDown])

    useEffect(() => {
        // if(props.countDown)
        // {
        //     setCounter(props.time);
        // }
        const interval = setTimeout(() => {
          setCounter(counter - 1);
        }, 1000);
        if (counter === 0) 
        {
            clearInterval(interval);
            props.endGame();
        }
        return () => clearTimeout(interval);
      }, [counter])
    
   
   return (
      <span className="status"><b>Time remain: {counter}</b></span>
  );
}

