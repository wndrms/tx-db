import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import InputForm from "./InputForm";

const Manage = ({AccountArray}) => {
  const [product, setproduct] = useState({});
  const [Accountlist, setAccountlist] = useState([]);

  useEffect(() => {
	  console.log(AccountArray);
	  setAccountlist(AccountArray);
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if(product.address == null || product.first == null || product.last == null){
	    alert('Address, BlockNumber 는 필수입니다');
	    return
    } else if(product.address.length != 42) {
	    alert('Address 형식 틀림');
	    return
    }
    try{
	    let accountobj = {
		    ...product,
		    code: Accountlist.length + 1
	    }
	    let tmpArray = Accountlist;
	    tmpArray = [...tmpArray, 
		    	accountobj];
	    const docRef = await addDoc(collection(dbService, "Hack_Account"), accountobj);
	    console.log("Document written with ID: ", docRef.id);
	    setAccountlist(tmpArray);
    } catch (e){
      console.error("Error adding document: ", e);
    }
  }
  const onfileSubmit = async ( event) => {
	  event.preventDefault();
	  alert('미구현');
	  try{
	  } catch (e) {
		  console.error("Error adding document: ", e);
	  }
  }
    return (
        <div id="wrap" className="Manage">
            <div className="chart">
            </div>
            <InputForm item={product} onChange={(value) => {
              setproduct({
                ...product,
                ...value
              });
            }}/>
            <div className="form-box">
              <button onClick={onSubmit}>저장하기</button>
            </div>
	    <div className="file-box">
	    	<h2>파일로 올리기</h2>
	    	<input type="file" />
	    	<button onClick={onfileSubmit}>업로드</button>
	    </div>
        </div>
    )
}

export default Manage;
