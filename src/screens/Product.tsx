import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Accordion, Form } from 'react-bootstrap';
import { ProductRepo } from "../modal/Product.repository";
import { Product } from "../modal/Product";
import IProduct from "../types/product.type";
import { getProduct } from "../services/Product/product.service";

const productRepostory = new ProductRepo();

const products: Product[] = productRepostory.getProducts();

const myProduct: Product = products[0];


const Styles = styled.div`
  .pageMainDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: center;
    align-items: flex-start;
    align-self: center;
    gap: 10px;
  }
  .leftDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    gap: 10px;
  }
  .rightDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: space-around;
    align-items: flex-start;
  }
  .imageDiv {
    display: flex;
  }
  .descriptionDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  
    align-items: center;
  
    border: 3px solid;
    border-radius: 10px;
  }
  .customCard {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 55px;
    padding: 55px;
    width: 250px;
    height: 250px;
    background: #2e2e2e !important;
  
    img {
      width: 170px;
      height: 170px;
      border-radius: 4px;
    }
  
    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    h5 {
      color: #ffffff;
    }
  
    h6 {
      font-weight: 300;
      color: #878787;
  
      overflow: hidden;
      // text-overflow: ellipsis; gerek yok?
      line-height: 1.5em;
      max-height: 3em;
    }
  }
`;

const ProductPage: React.FC = () => {
  // TODO: IProduct interface tanımlanacak
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO get id from route params
    getProduct(1).then((res) => {
      console.log(res);

      // TODO res doğru gelmiş mi, geldiyse setProduct yapıp product datası koyulacak
      

      setLoading(false);
    });
  }, [])

  return (
    <Styles>
      <div className="container">
        {loading ? (
          <>Loading</>
        ) : (
          <div className="pt-5 pb-5 pageMainDiv">
          <div className="col-md-5 leftDiv">
            <div className="imageDiv">
              <img
                src={myProduct.image}
                className="col-md-12"
              ></img>
            </div>
            <div className="col-md-12">
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="2" className="descriptionDiv">
                  <Accordion.Header>Description</Accordion.Header>
                  <Accordion.Body>
                    Created by <span className="text-primary">{myProduct.created_by}</span>
                    <br />
                    {myProduct.description}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Details</Accordion.Header>
                  <Accordion.Body>
                    ????
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col-md-7 rightDiv">
            <div>
              <h1 className="fs-5 text-primary">{myProduct.artist}</h1>
            </div>
            <div>
              <h2 className="fs-1"
                style={{
                  fontWeight: "bold",
                }}
              >
                {myProduct.name}
              </h2>
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "10px",
              }}
            >
              <h5>{myProduct.price}₺</h5>
            </div>
            <div className="col-md-5">
              <Form.Select>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </Form.Select>
            </div>
            <Button
              style={{
                minWidth: "auto",
                border: "1px solid",
                borderRadius: "15px",
                marginTop: "50px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              <i className="fa fa-money"></i>
              {" "}Buy NOW
            </Button>
          </div>
        </div>
        )}
      </div>
    </Styles>
  );
};

export default ProductPage;