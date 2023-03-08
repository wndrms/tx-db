import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import InputForm from "./InputForm";

const List = () => {
    const [products, setproducts] = useState([]);
    const [tmplist, settmplist] = useState([]);
    const [focusID, setfocusID] = useState("");
    const [update, setupdate] = useState(false);
    const [unit, setunit] = useState({});
    
    useEffect(() => {
        const query = async () => {
            const querySnapshot = await getDocs(collection(dbService, "product"));
            var productarray = [];
            querySnapshot.forEach((doc) => {
                productarray = [...productarray, {
                    id: doc.id,
                    ...doc.data()
                }];
            });
            productarray.sort((a, b) => a.buydate < b.buydate ? 1 : -1);
            setproducts(productarray);
        }
        query();
    }, []);
    const Item = (product) => {
        if (product.id === focusID) {
            if(!update){
                return(
                    <div style={{width:"500px", height:"400px"}}>
                        <div style={{display:"flex"}} onClick={() => setfocusID("")}>
                            <span>{product.buydate}</span>
                            <h3>{product.pdcode}</h3>
                            <img src={product.url} alt="" style={{width:"100px", height:"100px"}}/>
                        </div>
                        <div className="form-box">
                            <span>사이즈</span>
                            <span>{product.size}</span>
                        </div>
                        <div className="form-box">
                            <span>가격</span>
                            <span>{product.price}원</span>
                        </div>
                        {product.dollar !== undefined && (
                            <div className="form-box">
                                <span>달러 가격</span>
                                <span>{product.dollar}$</span>
                            </div>
                        )}
                        {product.dollar > 200 && (
                            <div className="form-box">
                                <span>관세</span>
                                <span>{product.tax}원</span>
                            </div>
                        )}
                        <div className="form-box">
                            <span>캐시백</span>
                            <span>{product.cashback}원</span>
                        </div>
                        <div className="form-box">
                            <span>구매 날짜</span>
                            <span>{product.buydate}</span>
                        </div>
                        <div className="form-box">
                            <span>구매 카드</span>
                            <span>{product.card}</span>
                        </div>
                        <div className="form-box">
                            <span>판매 날짜</span>
                            <span>{product.selldate}</span>
                        </div>
                        <div className="form-box">
                            <span>판매처</span>
                            <span>{product.platform}</span>
                        </div>
                        {product.INship !== undefined && (
                            <div className="form-box">
                                <span>국제배송비</span>
                                <span>{product.INship}원</span>
                            </div>
                        )}
                        <div className="form-box">
                            <span>판매 가격</span>
                            <span>{product.sell}원</span>
                        </div>
                        <div className="form-box">
                            <span>배송비</span>
                            <span>{product.ship}원</span>
                        </div>
                        <div className="form-box">
                            <span>보너스</span>
                            <span>{product.bonus}원</span>
                        </div>
                        <div className="form-box">
                            <span>정산 날짜</span>
                            <span>{product.settledate}</span>
                        </div>
                        <div className="form-box">
                            <span>수익</span>
                            <span style={{display:"contents"}}>{product.profit}</span>
                            <span>원</span>
                        </div>
                        <div style={{display:"flex", float:"right"}}>
                            <button onClick={()=>setupdate(true)}>수정</button>
                            <button onClick={onDelete}>삭제</button>
                        </div>
                    </div>
                );
            } else {
                return(
                    <>
                        <div style={{display:"flex"}} onClick={() => setfocusID("")}>
                            <span>{product.buydate}</span>
                            <h3>{product.pdcode}</h3>
                            <img src={product.url} alt="" style={{width:"100px", height:"100px"}}/>
                        </div>
                        <InputForm item={unit} onChange={(value) => setunit({
                            ...unit,
                            ...value
                        })}/>
                        <div style={{display:"flex", float:"right"}}>
                            <button onClick={onUpdate}>완료</button>
                            <button onClick={() => setupdate(false)}>취소</button>
                        </div>
                    </>
                );
            }
        }
        return(
            <div style={{display:"flex"}} onClick={() => {
                setfocusID(product.id);
                setunit(product);
            }}>
                <span>{product.buydate}</span>
                <h3>{product.pdcode}</h3>
                <img src={product.url} alt="" style={{width:"100px", height:"100px"}}/>
            </div>
        )
    }
    const onDelete = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if(ok) await deleteDoc(doc(dbService, "product", focusID));
    }
    const onUpdate = async () => {
        const DocRef = doc(dbService, "product", focusID);
        await updateDoc(DocRef, unit);
        console.log(unit);
        setupdate(false);
    }
    return (
        <div id="wrap" className="List">
            <div className="form-box">
                <input
                    type="radio"
                    id="status1"
                    name="status"
                    onChange={() => {
                        settmplist(products.filter(product => product.status === 1));
                    }}/>
                <label for="status1">주문</label>
                <input
                    type="radio"
                    id="status2"
                    name="status"
                    onChange={() => {
                        settmplist(products.filter(product => product.status === 2));
                    }}/>
                <label for="status2">
                    배송
                </label>
                <input
                    type="radio"
                    id="status3"
                    name="status"
                    onChange={() => {
                        settmplist(products.filter(product => product.status === 3));
                    }}/>
                <label for="status3">
                    보유
                </label>
                <input
                    type="radio"
                    id="status4"
                    name="status"
                    onChange={() => {
                        settmplist(products.filter(product => product.status === 4));
                    }}/>
                <label for="status4">
                    예약
                </label>
                <input
                    type="radio"
                    id="status5"
                    name="status"
                    onChange={() => {
                        var tmp = products.filter(product => product.status === 5);
                        tmp = tmp.sort((a, b) => a.settledate < b.settledate ? 1 : -1);
                        settmplist(tmp);
                    }}/>
                <label for="status5">
                    완료
                </label>
            </div>
            {tmplist.map((product) => {
                return Item(product);
            })}
        </div>
    )
}

export default List;