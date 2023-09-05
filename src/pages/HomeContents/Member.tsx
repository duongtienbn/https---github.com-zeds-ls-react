import { useRef } from "react";
import {
   NewInfoSection,
   TopNewInfo,
   TopNewSwiper,
   SwiperSwaper,
   IMG,
   TopNewBox,
} from "./../../styles/homeStyles/topNewInfoBox";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
import { baseAPI, baseURL, APITokenInHeader } from "../../global/global";
import styled from "styled-components";
import { Icon } from '@iconify/react';

const Member = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   width: 286px;
   height: 433px;
   border-radius: 3px;
   background: #fff;
   p {
      color: black;
   }

   transition: transform 0.2s, box-shadow 0.2s;
   &:hover {
      transform: scale(0.99);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
   }

   @media (max-width: 800px) {
      width: 230px;
      height: 370px;
   }
`;
const Info = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 20px 0;
   gap: 10px;
   font-size: 16px;
   @media (max-width: 800px) {
      font-size: 12px;
   }

   span {
      display: inline-flex;
      color: #212f44;
      font-weight: bold;
      font-family: sans-serif;
      padding-left: 15px;
   }
   p {
      padding: 0px 15px 10px 15px;
   }
`;
const ListMb = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
   max-width: 820px;

   p {
      margin-top: 30px;
      padding: 7px 20px;
      color: black;
      font-size: 1.4rem;
      font-weight: bold;
   }
`;

export const Members = () => {
   // const { t } = useTranslation();
   const scrl = useRef<HTMLDivElement | null>(null);

   const { isLoading, error, data } = useQuery({
      queryKey: ["prf"],
      queryFn: () =>
         fetch(
            `${baseAPI}/articles?filters[category][$eq]=staff&populate=avatar,hero`,
            APITokenInHeader
         ).then((res) => res.json()),
   });
   // console.log(baseAPI)
   if (isLoading) {
      return (
         <>
            <p>Loading...</p>
         </>
      );
   }

   if (error) return <p>An error has occurred</p>;

   const slide = (shift: number) => {
      if (scrl.current) {
         scrl.current.scrollLeft += shift;
      }
   };

   const renderedItems = data.data.map((item: any, index: any) => {
      const memberId = data.data[index].id;
      const urlPor = `${baseURL}${item.attributes.avatar.data?.attributes.formats.medium?.url}`;
      // console.log(urlPor);
      // console.log(memberId);
      return (
         <Member key={index}>
            <Link to={`/prft?engineer=${memberId}`}>
               <IMG>
                  <img src={urlPor} alt="" />
               </IMG>
               <Info>
                  <span>{item.attributes.title}</span>
                  <p>{item.attributes.introduction}</p>
               </Info>
            </Link>
         </Member>
      );
   });

   return (
      <>
         <NewInfoSection>
            <h2>リンクスタッフ社員</h2>
            <ListMb>
               <Link to="/prf">
                  <p>一覧表</p>
               </Link>
            </ListMb>
            <TopNewInfo className="member">
               <TopNewBox>
                  <TopNewSwiper>
                     <button className="LeftBtn" onClick={() => slide(-300)}>
                        <Icon icon="carbon:next-outline" width="50" height="50" hFlip={true} />
                     </button>
                     <SwiperSwaper ref={scrl}>{renderedItems}</SwiperSwaper>
                     <button className="RightBtn" onClick={() => slide(+300)}>
                        <Icon icon="carbon:next-outline"  width="50" height="50" />
                     </button>
                  </TopNewSwiper>
               </TopNewBox>
            </TopNewInfo>
         </NewInfoSection>
      </>
   );
};
