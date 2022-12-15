/* eslint-disable jsx-a11y/img-redundant-alt */
import { Carousel, Col, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import apiService from "./service/api.service";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ProductDetailPage = () => {
  const [data, setData] = useState<any>({});
  const [selectedColorVariant, setSelectedColorVariant] = useState<any>({});
  const [quantityCount, setQuantityCount] = useState<any>();

  // fetch all data from api and store into state, here we can make custom hooks multiple use case but there is only one use case
  useEffect(() => {
    apiService
      .getData()
      .then((res: any) => {
        setData(res?.data?.data);
        setSelectedColorVariant(res?.data?.data?.colorVariants?.[0]);
        setQuantityCount(res?.data?.data?.colorVariants?.[0]?.minOrder);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // increment quantity order if max order is less than current quantity order
  const incrementCount = () => {
    if (!(selectedColorVariant?.maxOrder <= quantityCount)) {
      setQuantityCount((prevCount: any) => prevCount + 1);
    }
  };

  // decrement quantity order if min order is greter than current quantity order
  const decrementCount = () => {
    if (!(selectedColorVariant?.minOrder >= quantityCount)) {
      setQuantityCount((prevCount: any) => prevCount - 1);
    }
  };

  return (
    <div className="outer">
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
          {/*  map images inside  carousel and if there is no any images available for respective color variants then map default images */}
          <Carousel
            autoplaySpeed={2000}
            dots={false}
            autoplay
            style={{ height: "100%" }}
          >
            {selectedColorVariant?.images?.length === 0
              ? data?.images?.map((image: string) => (
                  <img src={image} alt="image" />
                ))
              : selectedColorVariant?.images?.map((image: string) => (
                  <img src={image} alt="image" />
                ))}
          </Carousel>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={13} xxl={12}>
          <div className="col">
            <span className="title">{data?.title}</span>
            <div className="rating">
              <div>Rating</div>
              <Rate style={{ color: "red" }} disabled allowHalf value={4.5} />
              <a href="/">See All Reviews</a>
            </div>
            <div className="pricing">Rs. {selectedColorVariant?.price}</div>
            <div className="selectedColor">
              <div>Color ({selectedColorVariant?.color?.name})</div>
              <div className="radioBtnOuter">
                {/* map all color variants */}
                {data?.colorVariants?.map((item: any) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedColorVariant(item);
                        setQuantityCount(item?.minOrder);
                      }}
                      className={
                        selectedColorVariant?._id === item?._id
                          ? "bordered"
                          : ""
                      }
                      // assign respective color code
                      style={
                        item?.color?.colorValue.length === 1
                          ? {
                              height: "20px",
                              width: "20px",
                              backgroundColor: item?.color?.colorValue?.[0],
                              borderRadius: "50%",
                              marginTop: "10px",
                              cursor: "pointer",
                            }
                          : {
                              height: "20px",
                              width: "20px",
                              backgroundImage: `conic-gradient(${item?.color?.colorValue?.[0]} 0deg,${item?.color?.colorValue?.[0]} 180deg,${item?.color?.colorValue?.[1]} 180deg,${item?.color?.colorValue?.[1]} 360deg)`,
                              borderRadius: "50%",
                              marginTop: "10px",
                              cursor: "pointer",
                            }
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="quantity">
              <div>Select Quantity</div>
              <div className="quantityBtn">
                <MinusOutlined
                  className="minus"
                  onClick={() => decrementCount()}
                />
                <div className="selectedQuantity"> {quantityCount}</div>
                <PlusOutlined
                  className="plus"
                  onClick={() => incrementCount()}
                />
              </div>
            </div>
            {/* non functional  */}
            <div className="addToCart">Add To Cart</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
