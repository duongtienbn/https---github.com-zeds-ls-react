import { useTranslation } from "react-i18next";
import { FooterContainer } from "../GlobalStyle";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
    // MediumButton,
    ButtonSignup,
    ButtonNormal,
    // SmallButton,
} from "../components/ButtonStyled";
import { DISPLAY_CT } from "../GlobalStyle";

/* <td> (Table Data/Cell): Thẻ này đại diện cho một ô cột trong hàng. */
const TableDataLeft = styled.td`
    width: 30%;
    border-left: 1px solid #000;
    font-size: 1.6rem;
    padding: 10px;
`;
const TableDataRight = styled.td`
    border-right: 1px solid #000;
    font-size: 1.6rem;
`;
const Img = styled.img`
    position: absolute;
    width: 20%;
    top: 20px;
    left: 70%;
`;
const Button = styled.div`
    position: fixed;
    bottom: 50px;
    right: 20px;
    transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
    @media screen and (max-width: ${DISPLAY_CT}) {
        position: unset;
        width: 100%;
        padding: 13px;
        margin: 0 37px 0 0;
    }
`;
const SaveBtn = styled.div`
    width: 80px;
    height: 80px;
    margin: 10px;
    transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
    @media screen and (max-width: ${DISPLAY_CT}) {
        width: 100%;
        height: 46px;
        /* padding: 13px; */
        margin: 30px 0;
    }
`;
interface FormData {
    first_name: string;
    last_name: string;
    first_name_kana: string;
    last_name_kana: string;
    year: string;
    month: string;
    day: string;
    gender: string;
    zip_code: string;
    pref: string;
    city: string;
    town: string;
    address_hiragana: string;
    zip_more: string;
    pref_more: string;
    city_town: string;
    address_line: string;
    address_hiragana_more: string;
    formula: string;
    phone: string;
    email: string;
    phone_more: string;
    email_more: string;
    image: string;
    create_year: string;
    create_month: string;
    create_day: string;
}
function Resume() {
    const { t } = useTranslation();
    const [data, setFormData] = useState<FormData>();
    // "/resume" ページがロードされたときにローカル ストレージからデータを抽出します
    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // データを使用してStateまたは表示を更新します
            setFormData(parsedData);
        }
    }, []);

    const beforeSubmit = async (event: any) => {
        event.preventDefault();
    };

    const createExcel = async (event: any) => {
        event.preventDefault();
    };

    return (
        <>
            <FooterContainer>
                <table
                    style={{
                        padding: "30px",
                        width: "50%",
                        backgroundColor: "#cc7c7c",
                        marginLeft: "10%",
                    }}
                >
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    height: "43px",
                                    width: "200px",
                                    fontSize: "2rem",
                                    letterSpacing: "5pt",
                                    // lineHeight: "32.25pt",
                                }}
                            >
                                {t("form.rireki_sho")}
                            </td>
                            <TableDataRight
                                style={{
                                    borderRight: "none",
                                    textAlign: "right",
                                }}
                            >
                                {data?.create_year} {t("form.toshi")}{" "}
                                {data?.create_month} {t("form.tsuki")}{" "}
                                {data?.create_day} {t("form.nichi_genzai")}
                            </TableDataRight>
                        </tr>
                    </tbody>
                </table>

                <table
                    id="my-table-id"
                    cellSpacing="0"
                    style={{
                        width: "80%",
                        position: "relative",
                        margin: "0 auto",
                    }}
                >
                    <tbody>
                        <tr>
                            <TableDataLeft
                                style={{ borderTop: "1px solid #000" }}
                            >
                                &nbsp;{t("form.furigana")}
                            </TableDataLeft>
                            <TableDataRight
                                style={{ borderTop: "1px solid #000" }}
                            >
                                {data?.first_name_kana} {data?.last_name_kana}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>{t("form.onamae")}</TableDataLeft>
                            <TableDataRight>
                                {data?.first_name} {data?.last_name}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.sei_nen_gappi")}
                            </TableDataLeft>
                            <TableDataRight>
                                {data?.year} / {data?.month} / {data?.day}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>{t("form.sei_betsu")}</TableDataLeft>
                            <TableDataRight>
                                {data?.gender == "male" ? "男" : "女"}
                            </TableDataRight>
                        </tr>
                        <tr>
                            {/* <TableDataLeft>Ảnh người dùng</TableDataLeft> */}
                            <TableDataRight>
                                <Img
                                    src={data?.image}
                                    alt="ユーザーのイメージ"
                                />
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft
                                style={{ borderTop: "1px solid #000" }}
                            >
                                {t("form.furigana")}
                            </TableDataLeft>
                            <TableDataRight
                                style={{ borderTop: "1px solid #000" }}
                            >
                                {data?.address_hiragana}
                            </TableDataRight>
                        </tr>

                        <tr>
                            <TableDataLeft>
                                {t("form.yuubin_bangou")}
                            </TableDataLeft>
                            <TableDataRight>〒 {data?.zip_code}</TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.genjuu_sho")}
                            </TableDataLeft>
                            <TableDataRight>
                                {data?.pref}
                                {data?.city}
                                {data?.town}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.denwa_bangou")}
                            </TableDataLeft>
                            <TableDataRight>{data?.phone}</TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.meru_adoresu")}
                            </TableDataLeft>
                            <TableDataRight>{data?.email}</TableDataRight>
                        </tr>

                        <tr>
                            <TableDataLeft
                                style={{ borderTop: "1px solid #000" }}
                            >
                                {t("form.furigana")}
                            </TableDataLeft>
                            <TableDataRight
                                style={{ borderTop: "1px solid #000" }}
                            >
                                {data?.address_hiragana_more}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.yuubin_bangou")}
                            </TableDataLeft>
                            <TableDataRight>〒 {data?.zip_more}</TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.genjuu_sho")}
                            </TableDataLeft>
                            <TableDataRight>
                                {data?.pref_more}
                                {data?.city_town}
                                {data?.address_line}
                            </TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>{t("form.karagaki")}</TableDataLeft>
                            <TableDataRight>{data?.formula}</TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft>
                                {t("form.denwa_bangou")}
                            </TableDataLeft>
                            <TableDataRight>{data?.phone_more}</TableDataRight>
                        </tr>
                        <tr>
                            <TableDataLeft
                                style={{ borderBottom: "1px solid #000" }}
                            >
                                {t("form.meru_adoresu")}
                            </TableDataLeft>
                            <TableDataRight
                                style={{ borderBottom: "1px solid #000" }}
                            >
                                {data?.email_more}
                            </TableDataRight>
                        </tr>
                    </tbody>
                </table>

                <Button>
                    <SaveBtn className="saveBtn" onClick={createExcel}>
                        <ButtonSignup>
                            <span>{t("form.de_daunroudo")}</span>
                        </ButtonSignup>
                    </SaveBtn>

                    <SaveBtn onClick={beforeSubmit}>
                        <ButtonNormal>
                            <span>{t("form.insatsu")}</span>
                        </ButtonNormal>
                    </SaveBtn>
                    <SaveBtn onClick={beforeSubmit}>
                        <ButtonNormal>
                            <span>{t("form.modoru")}</span>
                        </ButtonNormal>
                    </SaveBtn>
                </Button>

                {/* </FooterBasic> */}
            </FooterContainer>
        </>
    );
}

export default Resume;
