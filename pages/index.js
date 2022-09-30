import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import ItemList from "../src/component/ItemList";
import { Divider, Header, Loader } from "semantic-ui-react";

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  function getData() {
    axios.get(API_URL).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Head>
        <title>Home | LeeCoder</title>
        <meta name="description" content="Next.js 실습 홈입니다." />
      </Head>
      {isLoading ? (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      ) : (
        <>
          <Header style={{ paddingTop: 40 }} as="h3">
            베스트 상품
          </Header>
          <Divider />
          <ItemList list={list.slice(0, 9)} />
          <Header style={{ paddingTop: 40 }} as="h3">
            신상품
          </Header>
          <Divider />
          <ItemList list={list.slice(9)} />
        </>
      )}
    </div>
  );
}
