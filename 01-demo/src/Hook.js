import React, { useEffect } from "react";

const Hook = ()=>{
  return ( <div>我是Hook组件<A/></div> )
}
const A = ()=>{
  const [uid, setUid] = React.useState();

  useEffect(()=>{
    setUid(111)
    console.log('useEffect',uid)
  },[])
  setTimeout(()=>{
    setUid(222)
  },1000)
  return (<B uid={uid}/>)
}
const B = ({uid})=>{
  console.log('BBBBB',uid)
return (<p>uuuuuid:{uid}</p>)
}
export default Hook