//テイエンが修正しました。

import styled from "styled-components";
import { DISPLAY_LG, DISPLAY_MD } from "../../GlobalStyle";
import { baseAPI, baseURL } from "../../global/global";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ButtonNormal, SmallButton } from "../../components/ButtonStyled";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin: 50px;
`;
const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  justify-items: center;
  margin: 0 auto;
  max-width: ${DISPLAY_LG};
  @media (max-width: ${DISPLAY_LG}) {
    grid-template-columns: 1fr 1fr;
    padding: 20px;
  }
  @media (max-width: ${DISPLAY_MD}) {
    grid-template-columns: 1fr;
  }
`;
const TopBox = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  background: #fff;
  border-radius: 8px;
  .title-container {
    margin-top: 10px;
  }
  h2 {
    color: #9c9e9c;
    font-weight: bold;
    padding: 8px 0;
    border-bottom: 1px solid rgb(227, 227, 227);
  }
  .text-content {
    color: #322422;
    padding: 5px 0;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.7;
    text-overflow: ellipsis;
    white-space: normal;
    &:hover {
      color: #6eb9f3;
    }
  }
  transition: transform 0.2s, box-shadow 0.2s;
  .img {
    width: 100%;
    height: 180px;
    padding: 0px;
    object-fit: cover;
  }
  @media (max-width: ${DISPLAY_MD}) {
    padding: 15px;
    width: 100%;
    /* height: 360px !important; */ 
  }
  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  top: 0;
  vertical-align: bottom;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
const apiUrl = `${baseAPI}/articles?filters[category][$eq]=Company-Voices&populate=hero`;

const IntroduceCompany = () => {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch(apiUrl).then((res) => res.json())
  );
  const [showFullContent, setShowFullContent] = useState<boolean[]>([]);
  const toggleContent = (index: any) => {
    setShowFullContent((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;
  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  };
  return (
    <>
      <Container>
        <Header>導入企業様の声</Header> 
        <TopContainer>
          {data.data.map((child: any, index: number) => (
            <TopBox
              key={index}
              className="value"
              style={{
                height: showFullContent[index] ? "auto" : "443px",
              }}
            >
              {child.attributes.hero.data.attributes.url ? (
                <div className="img">
                  <Img
                    src={`${baseURL}${child.attributes.hero.data.attributes.url}`}
                    alt="image"
                  />
                </div>
              ) : (
                <div>No image available</div>
              )}

              <div className="title-container">
                {child.attributes.title ? (
                  <h2>{child.attributes.title}</h2>
                ) : (
                  <h2>no title</h2>
                )}
              </div>

              <div
                className="text-content"
                onClick={() => toggleContent(index)}
              >
                <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml>
                  {showFullContent[index]
                    ? child.attributes.body
                    : truncateString(child.attributes.body, 85)}
                </ReactMarkdown>
              </div>
              <Button onClick={() => toggleContent(index)}>
                <SmallButton>
                  <ButtonNormal>
                    {showFullContent[index] ? "非表示" : "もっと見る"}
                  </ButtonNormal>
                </SmallButton>
              </Button>
            </TopBox>
          ))}
        </TopContainer>
      </Container>
    </>
  );
};
export default IntroduceCompany;
