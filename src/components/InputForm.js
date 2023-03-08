import React, { useState } from "react";

const InputForm = props => {
    const [product, setproduct] = useState(props.item);
    const onChange = event => {
        const {name, value} = event.target;
        if(name === "platform"){
            if (value === "SOLDOUT"){
                setproduct({
                    ...product,
                    [name]: value,
                    "bonus": 0
                });
                props.onChange({
                    ...product,
                    [name]: value,
                    "bonus": 0
                });
            } 
            else{
              setproduct({
                  ...product,
                  [name]: value,
                  "bonus": 0
              });
              props.onChange({
                  ...product,
                  [name]: value,
                  "bonus": 0
              });
            } 
        }
        else{
          setproduct({
              ...product,
              [name]: (["status", "price", "dollar","cashback", "INship", "sell", "ship"].includes(name)) ? parseFloat(value) : value
          });
          props.onChange({
              ...product,
              [name]: (["status", "price", "dollar", "cashback", "INship", "sell", "ship"].includes(name)) ? parseFloat(value) : value
          });
        }
    }
    const calc = () => {
      if(product.status < 4) return
      var profit = product.sell - product.price
                                  + product.cashback
                                  - product.ship
                                  + product.bonus;
      if(product.INship !== undefined) profit = profit - product.INship;
      if(product.tax !== undefined) profit = profit - product.tax;
      setproduct({
        ...product,
        'profit' : profit
      });
      props.onChange({
        ...product,
        'profit' : profit
      });
    }
    return (
        <div className="form-wrap" style={{width:"500px", height:"auto"}}>
              <div className="form-box">
                <span>Address</span>
                <input 
                  type="text"
                  name="address"
                  value={product.address}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>First BlockNumber</span>
                <input 
                  type="number"
                  name="first"
                  value={product.first}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>Last BlockNumber</span>
                <input 
                  type="number"
                  name="last"
                  value={product.last}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
              <div className="form-box">
                <span>Memo</span>
                <input
                  type="text"
                  name="info"
                  value={product.info}
                  className="style-bottom"
                  onChange={onChange}/>
              </div>
            </div>
    )
}

export default InputForm;
