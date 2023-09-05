import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { FooterContainer } from "../GlobalStyle";
import styled from "styled-components";
import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import { DISPLAY_CT } from "../GlobalStyle";
import {
    InputComponents,
    NameKanaComponents,
    DateComponents,
    SelectComponents,
    CreatedDateComponents,
    ModalComponents,
    ModalChild,
    ModalChildProps,
    schema,
    MyForm,
    Tr,
    Th,
    Label,
    Validation,
    Spance,
} from "../components/MyForm";
import {
    MediumButton,
    ButtonSignup,
    ButtonNormal,
} from "../components/ButtonStyled";
import ReInfoModal from "../components/Modal/ReInfoModal";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const BasicContent = styled.div`
    padding-bottom: 50px;
    background: #f4f6f7;
`;
const Wrapper = styled.div`
    display: flex;
    padding-bottom: 0px !important;
    position: relative;
`;
const Note = styled.span`
    width: 150px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 30px 0;
    transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
    @media screen and (max-width: 896px) {
        top: 90px !important;
        left: 0 !important;
        margin: 40px;
    }
`;
export const FormBox = styled.div`
    border-radius: 0px;
    background: #ffffff;
    padding: 60px 70px 30px;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: 896px) {
        border: 2px solid rgb(255, 255, 255);
        padding: 20px;
    }
`;
const DdTag = styled.dd`
    width: 100%;
    padding-left: 0;
    text-align: left;
    box-sizing: border-box;
    padding: 10px 30px 20px;
    position: relative;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        padding: 0;
        margin: 0;
    }
`;
const Top = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: 550;
    margin-bottom: 50px;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        font-size: 1.6rem;
        padding: 25px;
        margin: 0;
        text-align: center;
    }
`;
export const Selection = styled.div`
    display: flex;
    width: 100%;
    select {
        border: 1px solid #e1e6ea;
        background: #fff;
        background-size: 8px auto;
        border-radius: 4px;
        height: 50px;
        width: 25%;
        box-sizing: border-box;
        padding: 0 20px;
        appearance: none;
        color: #75787e;
        box-shadow: none;
        transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
        @media screen and (max-width: ${DISPLAY_CT}) {
            width: 15%;
        }
    }
    span {
        font-size: 1rem;
        margin: 17px 15px;
        transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
        @media screen and (max-width: ${DISPLAY_CT}) {
            font-size: 1rem;
            margin: 15px 10px;
        }
    }
`;
const OtherInformation = styled.div`
    margin-right: 200px;
    text-align: left;
    width: 220px;
    margin: 0 0 40px 0;
    :hover {
        border-radius: 5px;
        background: #dee2e4;
        transition: opacity 0.8s ease-out 0s, all 0.6s ease-out 0s;
    }
    p {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-sizing: border-box;
        cursor: pointer;
        border: 1px solid #d7d7d7;
        border-radius: 8px;
        font-weight: 500;
        height: 40px;
        width: 190px;
    }
`;
const ITag = styled.i`
    display: flex;
    justify-content: center;
`;
const OtherContact = styled.label`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 1.2rem;
    color: #1a1919;
    text-decoration: none;
    font-weight: 550;
`;
interface MyPOtrInProps {
    show: boolean;
}
const ExtraContent = styled.div<MyPOtrInProps>`
    display: ${(props) => (props.show ? "block" : "none")};
    background: #f4f6f7;
    margin: 0 0 40px;
    padding: 0 10px 20px;
    border-radius: 0;
`;
const ExtraEmail = styled.div<MyPOtrInProps>`
    display: ${(props) => (props.show ? "block" : "none")};
    background: #f4f6f7;
    margin: 0 0 40px;
    padding: 0 40px 30px;
    border-radius: 0;
`;
const ExtraTxt = styled.div`
    margin: 0 auto;
    padding: 40px 0;
    text-align: left;
    font-size: 1.2rem;
`;
const LabelGender = styled.label`
    cursor: pointer;
    position: relative;
    float: left;
    margin: 0 65px 0 20px;
    .SpanGender {
        position: absolute;
    }
    .male {
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 1.3rem;
    }
    .gender {
    }
    transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
    @media screen and (max-width: ${DISPLAY_CT}) {
        border: 1px solid #e1e6ea;
        width: 100%;
        padding: 13px;
        margin: 0 37px 0 0;
    }
`;
const FooterBasic = styled.div`
    max-width: 1000px;
    background-color: #f4f6f7;
    margin: 0px auto;
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    opacity: 0;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        width: 100%;
        padding: 13px;
    }
`;
const ButtonBottom = styled.div`
    background-color: #f4f6f7;
`;
const ButtonSpace = styled.div`
    transition: opacity 0.8s ease-out 0s, all 0.4s ease-out 0s;
    @media screen and (max-width: ${DISPLAY_CT}) {
        width: 95%;
    }
`;
const AutoInsert = styled.button`
    width: 15%;
    height: 52px;
    border-radius: 5px;
    border: 0.5px solid #b7b7b7;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    margin: 8px 30px;
    @media screen and (max-width: ${DISPLAY_CT}) {
        margin: 25px auto !important;
    }
    &:hover {
        scale: 1;
    }
`;
const ValidationInquiry = styled.div`
    position: absolute;
    color: #e00808;
    font-size: 1.4rem !important;
    font-weight: bold;
    left: 40%;
    bottom: 30px;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        left: 0px !important;
        bottom: 20px;
    }
`;
const ValidationInquiryTop = styled.div`
    position: absolute;
    color: #e00808;
    font-size: 1.4rem !important;
    font-weight: bold;
    left: 40%;
    bottom: 160px;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        bottom: 130px;
        left: 15px !important;
    }
`;
const ValidationInquiryBoot = styled.div`
    position: absolute;
    color: #e00808;
    font-size: 1.4rem !important;
    font-weight: bold;
    left: 40%;
    bottom: 50px;
    transition: opacity 0.4s ease-out, all 0.4s ease-out;
    @media screen and (max-width: ${DISPLAY_CT}) {
        /* position: unset; */
        left: 15px !important;
        bottom: 30px;
    }
`;
function Basic() {
    const [data, setFormData] = useState({
        first_name: "",
        last_name: "",
        first_name_kana: "",
        last_name_kana: "",
        year: "",
        month: "",
        day: "",
        gender: "",
        zip_code: "",
        pref: "",
        city: "",
        town: "",
        address_hiragana: "",
        zip_more: "",
        pref_more: "",
        city_town: "",
        address_line: "",
        address_hiragana_more: "",
        formula: "",
        phone: "",
        email: "",
        phone_more: "",
        email_more: "",
        image: "",
        create_year: "",
        create_month: "",
        create_day: "",
    });
    // Lưu dữ liệu vào Local Storage khi state thay đổi
    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(data));
    }, [data]);

    const { t } = useTranslation();
    const [postAPI, setPostAPI] = useState({
        data: {
            ...data,
        },
    });
    useEffect(() => {
        setPostAPI({
            data: {
                ...data,
            },
        });
    }, [data]);
    //Validateをチェックした、エラーメッセージ
    const [firstNameError, setFirstNameError] = useState<string | null>(
        sessionStorage.getItem("first_name_err")
    );
    const [firstNameKanaError, setFirstNameKanaError] = useState<string | null>(
        sessionStorage.getItem("first_name_kana_err")
    );
    const [lastNameError, setLastNameError] = useState<string | null>(
        sessionStorage.getItem("last_name_err")
    );
    const [lastNameKanaError, setLastNameKanaError] = useState<string | null>(
        sessionStorage.getItem("last_name_kana_err")
    );
    const [townErr, setTownErr] = useState<string | null>(
        sessionStorage.getItem("townErr")
    );
    const [cityErr, setCityErr] = useState<string | null>(
        sessionStorage.getItem("cityErr")
    );
    const [addressHiraganaErr, setAddressHiraganaErr] = useState<string | null>(
        sessionStorage.getItem("addressHiraganaErr")
    );
    const [cityTownErr, setCityTownErr] = useState<string | null>(
        sessionStorage.getItem("cityTownErr")
    );
    const [addressLineErr, setAddressLineErr] = useState<string | null>(
        sessionStorage.getItem("addressLineErr")
    );
    const [HiraganaMoreErr, setHiraganaMoreErr] = useState<string | null>(
        sessionStorage.getItem("HiraganaMoreErr")
    );
    const [formulaErr, setFormulaErr] = useState<string | null>(
        sessionStorage.getItem("formulaErr")
    );
    const [phoneErr, setPhoneErr] = useState<string | null>(
        sessionStorage.getItem("phoneErr")
    );
    const [emailErr, setEmailErr] = useState<string | null>(
        sessionStorage.getItem("emailErr")
    );
    const [phoneMoreErr, setPhoneMoreErr] = useState<string | null>(
        sessionStorage.getItem("phoneErr")
    );
    const [emailMoreErr, setEmailMoreErr] = useState<string | null>(
        sessionStorage.getItem("phoneErr")
    );
    const [imgErr, setImgErr] = useState<string | null>(
        sessionStorage.getItem("imgErr")
    );
    const [createDayErr, setCreateDayErr] = useState<string | null>(
        sessionStorage.getItem("createDayErr")
    );
    const [createMonthErr, setCreateMonthErr] = useState<string | null>(
        sessionStorage.getItem("createMonthErr")
    );
    const [createYearErr, setCreateYearErr] = useState<string | null>(
        sessionStorage.getItem("createYearErr")
    );
    const handleValidation = async (inputName: any, inputValue: any) => {
        try {
            await schema.validateAt(inputName, { [inputName]: inputValue });
            if (inputName === "first_name") {
                setFirstNameError("");
                sessionStorage.setItem("first_name_err", "");
            } else if (inputName === "first_name_kana") {
                setFirstNameKanaError("");
                sessionStorage.setItem("first_name_kana_err", "");
            } else if (inputName === "last_name") {
                setLastNameError("");
                sessionStorage.setItem("last_name_err", "");
            } else if (inputName === "last_name_kana") {
                setLastNameKanaError("");
                sessionStorage.setItem("last_name_kana_err", "");
            } else if (inputName === "town") {
                setTownErr("");
                sessionStorage.setItem("townErr", "");
            } else if (inputName == "city") {
                setCityErr("");
                sessionStorage.setItem("cityErr", "");
            } else if (inputName === "address_hiragana") {
                setAddressHiraganaErr("");
                sessionStorage.setItem("addressHiraganaErr", "");
            } else if (inputName === "city_town") {
                setCityTownErr("");
                sessionStorage.setItem("city_town", "");
            } else if (inputName === "address_line") {
                setAddressLineErr("");
                sessionStorage.setItem("addressLineErr", "");
            } else if (inputName === "address_hiragana_more") {
                setHiraganaMoreErr("");
                sessionStorage.setItem("HiraganaMoreErr", "");
            } else if (inputName === "formula") {
                setFormulaErr("");
                sessionStorage.setItem("formulaErr", "");
            } else if (inputName === "phone") {
                setPhoneErr("");
                sessionStorage.setItem("phoneErr", "");
            } else if (inputName === "email") {
                setEmailErr("");
                sessionStorage.setItem("emailErr", "");
            } else if (inputName === "phone_more") {
                setPhoneMoreErr("");
                sessionStorage.setItem("phoneMoreErr", "");
            } else if (inputName === "image") {
                sessionStorage.setItem("imgErr", "");
                setImgErr("");
            } else if (inputName === "email_more") {
                setEmailMoreErr("");
                sessionStorage.setItem("emailMoreErr", "");
            } else if (inputName === "create_year") {
                setCreateYearErr("");
                sessionStorage.setItem("createYearErr", "");
            } else if (inputName === "create_month") {
                setCreateMonthErr("");
                sessionStorage.setItem("createMonthErr", "");
            } else if (inputName === "create_day") {
                setCreateDayErr("");
                sessionStorage.setItem("createDayErr", "");
            }
        } catch (error: any) {
            if (inputName === "first_name") {
                setFirstNameError(error.message);
                sessionStorage.setItem("first_name_err", error.message);
            } else if (inputName === "first_name_kana") {
                setFirstNameKanaError(error.message);
                sessionStorage.setItem("first_name_kana_err", error.message);
            } else if (inputName === "last_name") {
                setLastNameError(error.message);
                sessionStorage.setItem("last_name_err", error.message);
            } else if (inputName === "last_name_kana") {
                setLastNameKanaError(error.message);
                sessionStorage.setItem("last_name_kana_err", error.message);
            } else if (inputName === "town") {
                setTownErr(error.message);
                sessionStorage.setItem("townErr", error.message);
            } else if (inputName == "city") {
                setCityErr(error.message);
                sessionStorage.setItem("cityErr", error.message);
            } else if (inputName === "address_hiragana") {
                setAddressHiraganaErr(error.message);
                sessionStorage.setItem("addressHiraganaErr", error.message);
            } else if (inputName === "city_town") {
                setCityTownErr(error.message);
                sessionStorage.setItem("cityTownErr", error.message);
            } else if (inputName === "address_line") {
                setAddressLineErr(error.message);
                sessionStorage.setItem("addressLineErr", error.message);
            } else if (inputName === "address_hiragana_more") {
                setHiraganaMoreErr(error.message);
                sessionStorage.setItem("HiraganaMoreErr", error.message);
            } else if (inputName === "formula") {
                setFormulaErr(error.message);
                sessionStorage.setItem("formulaErr", error.message);
            } else if (inputName === "phone") {
                setPhoneErr(error.message);
                sessionStorage.setItem("phoneErr", error.message);
            } else if (inputName === "email") {
                setEmailErr(error.message);
                sessionStorage.setItem("emailErr", error.message);
            } else if (inputName === "phone_more") {
                setPhoneMoreErr(error.message);
                sessionStorage.setItem("PhoneMoreErr", error.message);
            } else if (inputName === "email_more") {
                setEmailMoreErr(error.message);
                sessionStorage.setItem("emailMoreErr", error.message);
            } else if (inputName === "image") {
                sessionStorage.setItem("imgErr", error.message);
                setImgErr(error.message);
            } else if (inputName === "create_year") {
                setCreateYearErr(error.message);
                sessionStorage.setItem("createYearErr", error.message);
            } else if (inputName === "create_month") {
                setCreateMonthErr(error.message);
                sessionStorage.setItem("createMonthErr", error.message);
            } else if (inputName === "create_day") {
                setCreateDayErr(error.message);
                sessionStorage.setItem("createDayErr", error.message);
            }
        }
    };

    const [modal, setModal] = useState<boolean>(false);
    const [notificationModal, setNotification] = useState<boolean>(false);
    //State FormDataをsession storageから取得した値で更新します
    useEffect(() => {
        const storedFirstName = sessionStorage.getItem("first_name");
        const storedLastName = sessionStorage.getItem("last_name");
        const storedFirstNameKana = sessionStorage.getItem("first_name_kana");
        const storedLastNameKana = sessionStorage.getItem("last_name_kana");
        const storedYear = sessionStorage.getItem("year");
        const storedMonth = sessionStorage.getItem("month");
        const storedDay = sessionStorage.getItem("day");
        const storedGender = sessionStorage.getItem("gender");
        const storedPref = sessionStorage.getItem("pref");
        const storedZipCode = sessionStorage.getItem("zip_code");
        const storedCity = sessionStorage.getItem("city");
        const storedTown = sessionStorage.getItem("town");
        const storedZipMore = sessionStorage.getItem("zip_more");
        const storedPrefMore = sessionStorage.getItem("pref_more");
        const storedCityTown = sessionStorage.getItem("city_town");
        const storedAddressHiragana =
            sessionStorage.getItem("address_hiragana");
        const storedAddressHiraganaMore = sessionStorage.getItem(
            "address_hiragana_more"
        );
        const storedFormula = sessionStorage.getItem("formula");
        const storedAddress_line = sessionStorage.getItem("address_line");
        const storedPhone = sessionStorage.getItem("phone");
        const storedEmail = sessionStorage.getItem("email");
        const storedPhoneMore = sessionStorage.getItem("phone_more");
        const storedEmailMore = sessionStorage.getItem("email_more");
        const storedCreateYear = sessionStorage.getItem("create_year");
        const storedCreateMonth = sessionStorage.getItem("create_month");
        const storedCreateDay = sessionStorage.getItem("create_day");
        const storedImg = sessionStorage.getItem("previewUrl");
        setFormData((prevFormData) => ({
            ...prevFormData,
            first_name: storedFirstName || "",
            last_name: storedLastName || "",
            first_name_kana: storedFirstNameKana || "",
            last_name_kana: storedLastNameKana || "",
            year: storedYear || "",
            month: storedMonth || "",
            day: storedDay || "",
            gender: storedGender || "",
            zip_code: storedZipCode || "",
            pref: storedPref || "",
            city: storedCity || "",
            town: storedTown || "",
            address_hiragana: storedAddressHiragana || "",
            zip_more: storedZipMore || "",
            pref_more: storedPrefMore || "",
            city_town: storedCityTown || "",
            address_line: storedAddress_line || "",
            address_hiragana_more: storedAddressHiraganaMore || "",
            formula: storedFormula || "",
            phone: storedPhone || "",
            email: storedEmail || "",
            phone_more: storedPhoneMore || "",
            email_more: storedEmailMore || "",
            image: storedImg || "",
            create_year: storedCreateYear || "",
            create_month: storedCreateMonth || "",
            create_day: storedCreateDay || "",
        }));
    }, []);

    const handleSubmit = async (event: any) => {
        setModal(false);
        setNotification(true);
        event.preventDefault();
        if (!postAPI) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        } else {
            console.log("Đã gửi yêu cầu thành công:", data);
            // const apiUrl = `${baseAPI}/contacts`;
            //   axios
            //     .post(apiUrl, postAPI)
            //     .then((response) => {
            //       console.log("Đã gửi yêu cầu thành công:", response.data);
            //     })
            //     .catch((error) => {
            //       console.error("Lỗi khi gửi yêu cầu:", error);
            //     });
        }
    };

    const [showOtherAddress, setShowOtherAddress] = useState(false);
    const [OtherEmail, setOtherEmail] = useState(false);

    const [error, setError] = useState<string | null>(
        sessionStorage.getItem("addressError")
    );
    const [errorMore, setErrorMore] = useState<string | null>(
        sessionStorage.getItem("addressErrorMore")
    );
    // APIを呼び出してStateに保存します
    const [zipCode, setZipCode] = useState<string>(
        String(sessionStorage.getItem("zip_code"))
    );
    const [pref, setPref] = useState<string>(
        String(sessionStorage.getItem("pref"))
    );
    const [city, setCity] = useState<string>(
        String(sessionStorage.getItem("city"))
    );
    const [town, setTown] = useState<string>(
        String(sessionStorage.getItem("town"))
    );
    const [address_hiragana, setAddressHiragana] = useState<string>(
        String(sessionStorage.getItem("address_hiragana"))
    );
    const [zipCodeMore, setZipCodeMore] = useState<string>(
        String(sessionStorage.getItem("zip_more"))
    );
    const [prefMore, setPrefMore] = useState<string>(
        String(sessionStorage.getItem("pref_more"))
    );
    const [cityTown, setCityTown] = useState<string | null>(
        sessionStorage.getItem("city_town")
    );
    const [addressHiraganaMore, setAddressHiraganaMore] = useState<string>(
        String(sessionStorage.getItem("address_hiragana_more"))
    );

    // 性転換Function
    const [gender, setGender] = useState<any | string>(
        String(sessionStorage.getItem("gender"))
    );

    const handleGenderChanged = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const newGender = parseInt(event.target.value);
        const genderValue =
            newGender === 1 ? "male" : newGender === 2 ? "female" : "";
        setGender(genderValue);
        sessionStorage.setItem("gender", genderValue);
    };
    const handleClick = async (event: any) => {
        const { name, value } = event.target;
        const genderValue = value == 1 ? "male" : value == 2 ? "female" : "";
        if (
            (genderValue && name === "male") ||
            (genderValue && name === "female")
        ) {
            setGender("");
            sessionStorage.setItem("gender", "");
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            gender: genderValue,
        }));
    };
    // 詳細ボタンをクリックすると詳細情報が表示されます
    const toggleOtherAddress = () => {
        setShowOtherAddress(!showOtherAddress);
    };
    const toggleOtherEmail = () => {
        setOtherEmail(!OtherEmail);
    };
    // 郵便番号から API を処理する
    const handleZipCodeChange: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        const newZipCode = sessionStorage.getItem("zip_code");
        const addressError = "正しい郵便番号を入力してください";
        const error = "この郵便番号が見つかりません";
        try {
            const response = await axios.get(
                `https://apis.postcode-jp.com/api/v3/postcodes/${newZipCode}`
            );
            const { pref, city, town, hiragana, allAddress } = response.data;
            const hiraganaAddr = hiragana.allAddress;
            sessionStorage.setItem("pref", pref);
            sessionStorage.setItem("city", city);
            sessionStorage.setItem("town", town);
            sessionStorage.setItem("address_hiragana", hiraganaAddr);
            if (!allAddress) {
                setError(error);
                sessionStorage.setItem("addressError", error);
            } else {
                setError("");
                sessionStorage.setItem("addressError", "");
                setPref(pref);
                setCity(city);
                setTown(town);
                setAddressHiragana(hiraganaAddr);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pref: pref,
                    city: city,
                    town: town,
                    address_hiragana: hiraganaAddr,
                }));
            }
        } catch (error: any) {
            setError(addressError);
            sessionStorage.setItem("addressError", addressError);
            setPref("");
            setCity("");
            setTown("");
            setFormData((prevFormData) => ({
                ...prevFormData,
                pref: "",
                city: "",
                town: "",
                address_hiragana: "",
            }));
        }
    };
    const handleZipCodeChangeMore: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        const newZipCodeMore = sessionStorage.getItem("zip_more");
        const errorMore = "この郵便番号が見つかりません";
        const addressErrorMore = "正しい郵便番号を入力してください";
        try {
            const response = await axios.get(
                `https://apis.postcode-jp.com/api/v3/postcodes/${newZipCodeMore}`
            );
            const { pref, city, town, allAddress, hiragana } = response.data;
            const cityTown = city + town;
            const hiraganaAddrMore = hiragana.allAddress;
            sessionStorage.setItem("pref_more", pref);
            sessionStorage.setItem("city_town", cityTown);
            sessionStorage.setItem("address_hiragana_more", hiraganaAddrMore);
            if (!allAddress) {
                setErrorMore(errorMore);
                sessionStorage.setItem("addressErrorMore", errorMore);
            } else {
                setPrefMore(pref);
                setCityTown(cityTown);
                setAddressHiraganaMore(hiragana.allAddress);
                setErrorMore("");
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    pref_more: pref,
                    city_town: cityTown,
                    address_hiragana_more: hiraganaAddrMore,
                }));
            }
        } catch (error) {
            setErrorMore(addressErrorMore);
            sessionStorage.setItem("addressErrorMore", addressErrorMore);
            setCityTown("");
            setPrefMore("");
            setFormData((prevFormData) => ({
                ...prevFormData,
                pref_more: "",
                city_town: "",
                address_hiragana_more: "",
            }));
        }
    };
    //upload picture
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
        sessionStorage.getItem("previewUrl")
    );
    // 1. 新しいプレビューURLが利用可能なときに画像をセッションストレージに保存します
    useEffect(() => {
        if (previewUrl) {
            sessionStorage.setItem("previewUrl", String(previewUrl));
        }
    }, [previewUrl]);

    const handleFileInputChange = (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    setImgErr("");
                    setPreviewUrl(result);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        image: result,
                    }));
                } else if (result instanceof ArrayBuffer) {
                    // ArrayBuffer (dạng dữ liệu nhị phân),
                    //hàm giải mã ArrayBuffer thành một chuỗi
                    const textDecoder = new TextDecoder();
                    const decodedString = textDecoder.decode(result);
                    setImgErr("");
                    setPreviewUrl(decodedString);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        image: decodedString,
                    }));
                } else {
                    // Nếu không có kết quả đọc hoặc lỗi, hàm đặt giá trị previewUrl
                    // thành chuỗi rỗng để xóa hình ảnh hiển thị.
                    setImgErr("");
                    setPreviewUrl("");
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        image: "",
                    }));
                }
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: "",
            }));
            // Kiểm tra validation cho trường "image"
            handleValidation("image", "");
        }
    };
    const handleDeleteButtonClick = () => {
        setPreviewUrl(null);
        sessionStorage.setItem("previewUrl", "");
        handleValidation("image", previewUrl);
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: "",
        }));
    };

    //date
    const currentDate = new Date();
    const [currentDay, setCurrentDay] = useState<string | null>(
        sessionStorage.getItem("create_day")
    );
    const [currentMonth, setCurrentMonth] = useState<string | null>(
        sessionStorage.getItem("create_month")
    );
    const [thisYear, setThisYear] = useState<string | null>(
        sessionStorage.getItem("create_year")
    );

    const handleSetCurrentDate = () => {
        setCurrentDay(currentDate.getDate().toString());
        sessionStorage.setItem("create_day", currentDate.getDate().toString());
        setCurrentMonth((currentDate.getMonth() + 1).toString());
        sessionStorage.setItem(
            "create_month",
            (currentDate.getMonth() + 1).toString()
        );
        setThisYear(currentDate.getFullYear().toString());
        sessionStorage.setItem(
            "create_year",
            currentDate.getFullYear().toString()
        );
        setFormData((prevFormData) => ({
            ...prevFormData,
            create_day: currentDate.getDate().toString(),
            create_month: (currentDate.getMonth() + 1).toString(),
            create_year: currentDate.getFullYear().toString(),
        }));
    };
    const options = [
        { value: "東京都", label: "東京都" },
        { value: "神奈川県", label: "神奈川県" },
        { value: "埼玉県", label: "埼玉県" },
        { value: "千葉県", label: "千葉県" },
        { value: "大阪府", label: "大阪府" },
        { value: "京都府", label: "京都府" },
        { value: "兵庫県", label: "兵庫県" },
        { value: "北海道", label: "北海道" },
        { value: "青森県", label: "青森県" },
        { value: "秋田県", label: "秋田県" },
        { value: "岩手県", label: "岩手県" },
        { value: "山形県", label: "山形県" },
        { value: "宮城県", label: "宮城県" },
        { value: "福島県", label: "福島県" },
        { value: "茨城県", label: "茨城県" },
        { value: "栃木県", label: "栃木県" },
        { value: "群馬県", label: "群馬県" },
        { value: "山梨県", label: "山梨県" },
        { value: "長野県", label: "長野県" },
        { value: "新潟県", label: "新潟県" },
        { value: "富山県", label: "富山県" },
        { value: "石川県", label: "石川県" },
        { value: "福井県", label: "福井県" },
        { value: "静岡県", label: "静岡県" },
        { value: "愛知県", label: "愛知県" },
        { value: "岐阜県", label: "岐阜県" },
        { value: "三重県", label: "三重県" },
        { value: "滋賀県", label: "滋賀県" },
        { value: "奈良県", label: "奈良県" },
        { value: "和歌山県", label: "和歌山県" },
        { value: "鳥取県", label: "鳥取県" },
        { value: "島根県", label: "島根県" },
        { value: "岡山県", label: "岡山県" },
        { value: "広島県", label: "広島県" },
        { value: "山口県", label: "山口県" },
        { value: "香川県", label: "香川県" },
        { value: "徳島県", label: "徳島県" },
        { value: "高知県", label: "高知県" },
        { value: "愛媛県", label: "愛媛県" },
        { value: "福岡県", label: "福岡県" },
        { value: "佐賀県", label: "佐賀県" },
        { value: "長崎県", label: "長崎県" },
        { value: "大分県", label: "大分県" },
        { value: "熊本県", label: "熊本県" },
        { value: "宮崎県", label: "宮崎県" },
        { value: "鹿児島県", label: "鹿児島県" },
        { value: "沖縄県", label: "沖縄県" },
        { value: "海外（中国）", label: "海外（中国）" },
        { value: "海外海外（アメリカ）", label: "海外（アメリカ）" },
        { value: "海外（ヨーロッパ）", label: "海外（ヨーロッパ）" },
        { value: "海外（その他）", label: "海外（その他）" },
    ];
    const beforeSubmit = async (event: any) => {
        event.preventDefault();
        await handleZipCodeChange(event);
        await handleZipCodeChangeMore(event);
        await handleValidation("gender", data.gender);
        await handleValidation("first_name", data.first_name);
        await handleValidation("last_name", data.last_name);
        await handleValidation("first_name_kana", data.first_name_kana);
        await handleValidation("last_name_kana", data.last_name_kana);
        await handleValidation("city", data.city);
        await handleValidation("town", data.town);
        await handleValidation("address_line", data.address_line);
        await handleValidation("address_hiragana", data.address_hiragana);
        await handleValidation(
            "address_hiragana_more",
            data.address_hiragana_more
        );
        await handleValidation("formula", data.formula);
        await handleValidation("phone", data.phone);
        await handleValidation("email", data.email);
        await handleValidation("phone_more", data.phone_more);
        await handleValidation("email_more", data.email_more);
        await handleValidation("city_town", data.city_town);
        await handleValidation("create_year", data.create_year);
        await handleValidation("create_month", data.create_month);
        await handleValidation("create_day", data.create_day);
        await handleValidation("image", previewUrl);
        // console.log(previewUrl)
        if (
            firstNameError ||
            lastNameError ||
            firstNameError ||
            lastNameError ||
            createMonthErr ||
            createYearErr ||
            createDayErr ||
            imgErr ||
            emailErr ||
            phoneErr ||
            cityErr ||
            townErr ||
            // formulaErr ||
            // addressLineErr ||
            // HiraganaMoreErr ||
            // cityTownErr ||
            // emailMoreErr ||
            // phoneMoreErr ||

            !data.first_name
        ) {
            // console.log("co loi ");
        } else {
            setModal(true);
        }
    };
    const mei = "mei";
    const { register } = useForm({
        resolver: yupResolver(schema),
    });
    const modalChildPropsList: ModalChildProps[] = [
        {
            componentsName: t("form.sei"),
            value: data.first_name,
            id: "firstName",
            setModal: setModal,
        },
        {
            componentsName: t(`form.${mei}`),
            value: data.last_name,
            id: "lastName",
            setModal: setModal,
        },
        {
            componentsName: t("form.sei_kana"),
            value: data.first_name_kana,
            id: "firstNameKana",
            setModal: setModal,
        },
        {
            componentsName: t("form.mei_kana"),
            value: data.last_name_kana,
            id: "lastNameKana",
            setModal: setModal,
        },
        {
            componentsName: t("form.sei_nen_gappi"),
            value: `${data.year} / ${data.month} / ${data.day}`,
            id: "year",
            setModal: setModal,
        },
        {
            componentsName: t("form.sei_betsu"),
            value: data.gender,
            id: "male",
            setModal: setModal,
        },
        {
            componentsName: t("form.yuubin_bangou"),
            value: data.zip_code,
            id: "zip_code",
            setModal: setModal,
        },
        {
            componentsName: t("form.jyuusho"),
            value: `${data.pref} ${data.city} ${data.town}`,
            id: "pref",
            setModal: setModal,
        },
        {
            componentsName: t("form.juusho_furigana"),
            value: data.address_hiragana,
            id: "address_hiragana",
            setModal: setModal,
        },
        {
            componentsName: t("form.yuubin_bangou"),
            value: data.zip_more,
            id: "zip_more",
            setModal: setModal,
        },
        {
            componentsName: t("form.jyuusho"),
            value: `${data.pref_more} ${data.city_town}`,
            id: "pref_more",
            setModal: setModal,
        },
        {
            componentsName: t("form.manshon_tatemono_mei_tou"),
            value: data.address_line,
            id: "address_line",
            setModal: setModal,
        },
        {
            componentsName: t("form.juusho_furigana"),
            value: data.address_hiragana_more,
            id: "address_hiragana_more",
            setModal: setModal,
        },
        {
            componentsName: t("form.karagaki"),
            value: data.formula,
            id: "formula",
            setModal: setModal,
        },
        {
            componentsName: t("form.denwa_bangou"),
            value: data.phone,
            id: "phone",
            setModal: setModal,
        },
        {
            componentsName: t("form.meru_adoresu"),
            value: data.email,
            id: "email",
            setModal: setModal,
        },
        {
            componentsName: t("form.sakusei_bi"),
            value: `${data.create_year}/ ${data.create_month}/${data.create_day}`,
            id: "create_year",
            setModal: setModal,
        },
        {
            componentsName: t("form.shoumei_shashin"),
            value: previewUrl && (
                <img
                    style={{ width: "50%" }}
                    className="img"
                    src={String(previewUrl)}
                    alt="Preview"
                />
            ),
            id: "fileInput",
            setModal: setModal,
        },
        {
            componentsName: t("form.denwa_bangou"),
            value: data.phone_more,
            id: "phone_more",
            setModal: setModal,
        },
        {
            componentsName: t("form.meru_adoresu"),
            value: data.email_more,
            id: "email_more",
            setModal: setModal,
        },
    ];
    const confirmation = (event: any) => {
        event.preventDefault();
    };
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        sessionStorage.setItem(name, value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleBlur = async (event: any) => {
        const { name, value } = event.target;
        sessionStorage.setItem(name, value);
        await handleValidation(name, value);
        console.log(data);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const createExcel = async (event: any) => {
        event.preventDefault();
    };
    return (
        <form onSubmit={confirmation}>
            <ModalComponents
                status={modal}
                showModal={setModal}
                onFunction={handleSubmit}
                height={95}
                heights={50}
                width={80}
            >
                {modalChildPropsList.map((modalChildProps, index) => (
                    <ModalChild key={index} {...modalChildProps} />
                ))}
            </ModalComponents>
            <ReInfoModal
                status={notificationModal}
                showModal={setNotification}
                onFunction={() => setNotification(false)}
            >
                <div style={{ margin: "auto 0", lineHeight: "2" }}>
                    <h2 style={{ fontSize: "2.5rem" }}>
                        データを保存いたしました
                        <br /> 保存リストよりデータを確認することができます。
                    </h2>
                </div>
            </ReInfoModal>
            <BasicContent>
                <FooterContainer>
                    <FormBox>
                        <Top>{t("form.kihon_jouhou")}</Top>
                        <Wrapper>
                            <NameKanaComponents
                                componentsName={t("form.onamae")}
                                firstRegister="first_name"
                                firstKanaRegister="first_name_kana"
                                lastRegister="last_name"
                                lastKanaRegister="last_name_kana"
                                nameFirst="first_name"
                                nameKanaFirst="first_name_kana"
                                nameLast="last_name"
                                nameKanaLast="last_name_kana"
                                valueFirst={data.first_name}
                                valueKanaFirst={data.first_name_kana}
                                valueLast={data.last_name}
                                valueKanaLast={data.last_name_kana}
                                firstNameId="firstName"
                                lastNameId="lastName"
                                firstNameKanaId="firstNameKana"
                                lastNameKanaId="firstNameKana"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <ValidationInquiryTop>
                                <div>
                                    {firstNameError && <p>{firstNameError}</p>}
                                </div>
                            </ValidationInquiryTop>
                            <ValidationInquiryTop style={{ left: "69%" }}>
                                <div>
                                    {lastNameError && <p>{lastNameError}</p>}
                                </div>
                            </ValidationInquiryTop>
                            <ValidationInquiryBoot>
                                <div>
                                    {firstNameKanaError && (
                                        <p>{firstNameKanaError}</p>
                                    )}
                                </div>
                            </ValidationInquiryBoot>
                            <ValidationInquiryBoot style={{ left: "69%" }}>
                                <div>
                                    {lastNameKanaError && (
                                        <p>{lastNameKanaError}</p>
                                    )}
                                </div>
                            </ValidationInquiryBoot>
                        </Wrapper>
                        <MyForm>
                            <Tr>
                                <Th style={{ margin: "auto 0" }}>
                                    <Label htmlFor="" className="">
                                        {t("form.sei_nen_gappi")}
                                    </Label>
                                </Th>
                                <DdTag>
                                    <DateComponents
                                        onChange={handleChange}
                                        yearValue={data.year}
                                        monthValue={data.month}
                                        dayValue={data.day}
                                        yearName="year"
                                        monthName="month"
                                        dayName="day"
                                        id="year"
                                    />
                                </DdTag>
                            </Tr>
                        </MyForm>
                        <MyForm className="gender">
                            <Tr style={{ position: "relative" }}>
                                <Th>
                                    <Label className="mypFormDt">
                                        {" "}
                                        {t("form.sei_betsu")}
                                    </Label>
                                </Th>
                                <DdTag>
                                    <div style={{ display: "flex" }}>
                                        <LabelGender>
                                            <input
                                                {...register("gender")}
                                                type="radio"
                                                name="male"
                                                value="1"
                                                id="male"
                                                className="gender"
                                                checked={gender == "male"}
                                                onChange={handleGenderChanged}
                                                onClick={handleClick}
                                            />{" "}
                                            <label
                                                className="LabelGender"
                                                htmlFor="male"
                                            >
                                                <Spance>
                                                    {t("form.dansei")}
                                                </Spance>
                                            </label>
                                        </LabelGender>
                                        <LabelGender>
                                            <input
                                                {...register("gender")}
                                                type="radio"
                                                name="female"
                                                value="2"
                                                id="female"
                                                className="gender"
                                                checked={gender == "female"}
                                                onChange={handleGenderChanged}
                                                onClick={handleClick}
                                            />{" "}
                                            <label
                                                className="LabelGender"
                                                htmlFor="female"
                                            >
                                                <Spance>
                                                    {t("form.jousei")}
                                                </Spance>
                                            </label>
                                        </LabelGender>
                                    </div>
                                </DdTag>
                            </Tr>
                        </MyForm>
                        <Wrapper>
                            <InputComponents
                                onChange={(event) =>
                                    setZipCode(event.target.value)
                                }
                                onBlur={handleBlur}
                                componentsName={t("form.yuubin_bangou")}
                                register="title"
                                name="zip_code"
                                id="zip_code"
                                value={zipCode == "null" ? "" : zipCode}
                                className="inputText150px"
                                placeholder="1234567"
                            />
                            <Validation style={{ bottom: "25px" }}>
                                <span>{error && <span>{error}</span>}</span>
                            </Validation>
                            <AutoInsert onClick={handleZipCodeChange}>
                                <ButtonNormal>
                                    <span>{t("form.jidou_nyuuryoku")}</span>
                                </ButtonNormal>
                            </AutoInsert>
                        </Wrapper>
                        <SelectComponents
                            componentsName={t("form.todou_fuken")}
                            id="pref"
                            register="pref"
                            options={options}
                            onChange={(e) => setPref(e.target.value)}
                            value={pref ?? ""}
                            className="inputText150px"
                        />

                        <Wrapper>
                            <InputComponents
                                onBlur={handleBlur}
                                onChange={(e) => setCity(e.target.value)}
                                componentsName={t(
                                    "form.shiku_chouson_machi_iki"
                                )}
                                register="city"
                                name="city"
                                id="city"
                                value={city == "null" ? "" : city}
                                className="inputText340px"
                                placeholder="〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇"
                            />
                            <ValidationInquiry>
                                <div>{cityErr && <p>{cityErr}</p>}</div>
                            </ValidationInquiry>
                        </Wrapper>
                        <Wrapper>
                            <InputComponents
                                onBlur={handleBlur}
                                onChange={(e) => setTown(e.target.value)}
                                componentsName={t("form.banchi_tatemono_mei")}
                                register="town"
                                name="town"
                                id="town"
                                value={town == "null" ? "" : town}
                                className="inputText340px"
                                placeholder="〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇"
                            />
                            <ValidationInquiry>
                                <div>{townErr && <p>{townErr}</p>}</div>
                            </ValidationInquiry>
                        </Wrapper>
                        <Wrapper>
                            <InputComponents
                                onBlur={handleBlur}
                                onChange={(e) =>
                                    setAddressHiragana(e.target.value)
                                }
                                componentsName={t("form.juusho_furigana")}
                                register="address_hiragana"
                                name="address_hiragana"
                                id="address_hiragana"
                                value={
                                    address_hiragana == "null"
                                        ? ""
                                        : address_hiragana
                                }
                                className="inputText410px"
                            />
                            <ValidationInquiry>
                                <div>
                                    {addressHiraganaErr && (
                                        <p>{addressHiraganaErr}</p>
                                    )}
                                </div>
                            </ValidationInquiry>
                        </Wrapper>
                        <MyForm>
                            <OtherInformation
                                className={`luonluon ${
                                    showOtherAddress ? "true-them" : ""
                                }`}
                            >
                                <OtherContact
                                    className=""
                                    onClick={toggleOtherAddress}
                                >
                                    <ITag className="">
                                        <span style={{ margin: "-1px" }}>
                                            <Icon
                                                icon="ic:outline-add"
                                                width="20"
                                                height="20"
                                            />
                                        </span>
                                        <span>
                                            {t(
                                                "form.joukiigai_ni_renrakusen_ga_aru_baai"
                                            )}
                                        </span>
                                    </ITag>
                                </OtherContact>
                            </OtherInformation>
                            <ExtraContent
                                className=""
                                show={showOtherAddress}
                                id="popup"
                            >
                                <ExtraTxt>
                                    {t(
                                        "form.sho_jijou_de_joukiigai_ni_renraku_o_kibou_suru"
                                    )}
                                </ExtraTxt>
                                <Wrapper>
                                    <InputComponents
                                        onChange={(e) =>
                                            setZipCodeMore(e.target.value)
                                        }
                                        onBlur={handleBlur}
                                        componentsName={t("form.yuubin_bangou")}
                                        register="title"
                                        name="zip_more"
                                        id="zip_more"
                                        value={
                                            zipCodeMore == "null"
                                                ? ""
                                                : zipCodeMore
                                        }
                                        className="inputText210px"
                                        placeholder="1234567"
                                    />
                                    <Note
                                        style={{ minWidth: "80px" }}
                                        className=""
                                    >
                                        {t("form.haifun_fuyou")}
                                    </Note>
                                    <Validation style={{ top: "65px" }}>
                                        <span>
                                            {errorMore && (
                                                <span>{errorMore}</span>
                                            )}
                                        </span>
                                    </Validation>
                                    <AutoInsert
                                        onClick={handleZipCodeChangeMore}
                                        style={{
                                            marginTop: "11px",
                                            width: "15%",
                                            height: "50px",
                                            minWidth: "70px",
                                        }}
                                    >
                                        <ButtonNormal>
                                            <span>
                                                {t("form.jidou_nyuuryoku")}
                                            </span>
                                        </ButtonNormal>
                                    </AutoInsert>
                                </Wrapper>
                                <SelectComponents
                                    onBlur={handleBlur}
                                    componentsName={t("form.todou_fuken")}
                                    name="pref_more"
                                    id="pref_more"
                                    register="pref_more"
                                    options={options}
                                    onChange={(e) =>
                                        setPrefMore(e.target.value)
                                    }
                                    value={prefMore ?? ""}
                                    className="inputText210px"
                                />
                                <Wrapper>
                                    <InputComponents
                                        onBlur={handleBlur}
                                        onChange={(event) =>
                                            setCityTown(event.target.value)
                                        }
                                        componentsName={t(
                                            "form.shiku_chouson_banchi"
                                        )}
                                        register="city_town"
                                        name="city_town"
                                        id="city"
                                        value={cityTown ?? ""}
                                        className="inputText340px"
                                    />
                                    <ValidationInquiry>
                                        <div>
                                            {cityTownErr && (
                                                <p>{cityTownErr}</p>
                                            )}
                                        </div>
                                    </ValidationInquiry>
                                </Wrapper>
                                <Wrapper>
                                    <InputComponents
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        componentsName={t(
                                            "form.manshon_tatemono_mei_tou"
                                        )}
                                        register="address_line"
                                        name="address_line"
                                        id="address_line"
                                        value={data.address_line}
                                        className="inputText340px"
                                    />
                                    <ValidationInquiry>
                                        <div>
                                            {addressLineErr && (
                                                <p>{addressLineErr}</p>
                                            )}
                                        </div>
                                    </ValidationInquiry>
                                </Wrapper>
                                <Wrapper>
                                    <InputComponents
                                        onBlur={handleBlur}
                                        onChange={(e) =>
                                            setAddressHiraganaMore(
                                                e.target.value
                                            )
                                        }
                                        componentsName={t(
                                            "form.juusho_furigana"
                                        )}
                                        register="address_hiragana_more"
                                        name="address_hiragana_more"
                                        id="address_hiragana_more"
                                        value={
                                            addressHiraganaMore == "null"
                                                ? ""
                                                : addressHiraganaMore
                                        }
                                        className="inputText410px"
                                    />
                                    <ValidationInquiry>
                                        <div>
                                            {HiraganaMoreErr && (
                                                <p>{HiraganaMoreErr}</p>
                                            )}
                                        </div>
                                    </ValidationInquiry>
                                </Wrapper>
                                <div style={{ position: "relative" }}>
                                    <InputComponents
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        componentsName={t("form.karagaki")}
                                        register="formula"
                                        name="formula"
                                        id="formula"
                                        value={data.formula}
                                        className="inputText340px"
                                    />
                                    <Note
                                        className=""
                                        style={{
                                            position: "absolute",
                                            width: "auto",
                                            top: "70px",
                                            margin: "0px",
                                            right: "100px",
                                        }}
                                    >
                                        （{" "}
                                        {t(
                                            "form.rirekisho_ni_kinyu_shita_myouji_to_juusho_no_hyousatsu_no_myouji_ga_kotonaru_baai_nomi_kinyuu"
                                        )}
                                        ）
                                    </Note>
                                    <ValidationInquiry style={{ top: "110px" }}>
                                        <div>
                                            {formulaErr && <p>{formulaErr}</p>}
                                        </div>
                                    </ValidationInquiry>
                                </div>
                            </ExtraContent>
                        </MyForm>
                        <Wrapper>
                            <InputComponents
                                onBlur={handleBlur}
                                onChange={handleChange}
                                componentsName={t("form.denwa_bangou")}
                                className="inputText210px"
                                register="phone"
                                name="phone"
                                id="phone"
                                value={data.phone}
                                placeholder="xxx-xxxx-xxxx"
                            />
                            <ValidationInquiry>
                                <div>{phoneErr && <p>{phoneErr}</p>}</div>
                            </ValidationInquiry>
                        </Wrapper>
                        <Wrapper>
                            <InputComponents
                                onChange={handleChange}
                                onBlur={handleBlur}
                                componentsName={t("form.meru_adoresu")}
                                register="email"
                                name="email"
                                id="email"
                                value={data.email}
                                className="inputText410px"
                            />
                            <ValidationInquiry>
                                <div>{emailErr && <p>{emailErr}</p>}</div>
                            </ValidationInquiry>
                        </Wrapper>
                        <OtherInformation>
                            <OtherContact
                                className=""
                                onClick={toggleOtherEmail}
                            >
                                <ITag className="Icon">
                                    {t(
                                        "form.joukiigai_ni_renrakusen_ga_aru_baai"
                                    )}
                                </ITag>
                            </OtherContact>
                        </OtherInformation>
                        <ExtraEmail show={OtherEmail}>
                            <ExtraTxt>
                                {t(
                                    "form.sho_jijou_de_joukiigai_ni_renraku_o_kibou_suru"
                                )}
                            </ExtraTxt>
                            <div className="">
                                <Wrapper>
                                    <InputComponents
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        componentsName={t("form.denwa_bangou")}
                                        register="phone_more"
                                        name="phone_more"
                                        id="phone_more"
                                        value={data.phone_more}
                                    />
                                    <ValidationInquiry>
                                        <div>
                                            {phoneMoreErr && (
                                                <p>{phoneMoreErr}</p>
                                            )}
                                        </div>
                                    </ValidationInquiry>
                                </Wrapper>
                                <Wrapper>
                                    <InputComponents
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        componentsName={t("form.meru_adoresu")}
                                        register="email_more"
                                        name="email_more"
                                        id="email_more"
                                        value={data.email_more}
                                        placeholder="aaaa@aaaa.aa.aa"
                                    />
                                    <ValidationInquiry>
                                        <div>
                                            {emailMoreErr && (
                                                <p>{emailMoreErr}</p>
                                            )}
                                        </div>
                                    </ValidationInquiry>
                                </Wrapper>
                            </div>
                        </ExtraEmail>
                        <Wrapper>
                            <Tr>
                                <Th>
                                    <Label>{t("form.shoumei_shashin")}</Label>
                                </Th>
                                <DdTag>
                                    <OtherInformation>
                                        <OtherContact
                                            htmlFor="fileInput"
                                            className=""
                                        >
                                            <Icon
                                                icon="ep:upload"
                                                width="20"
                                                height="20"
                                            />
                                            {t("form.shashin_oappuroudo_suru")}
                                        </OtherContact>
                                    </OtherInformation>
                                    {previewUrl && (
                                        <img
                                            className="img"
                                            src={String(previewUrl)}
                                            alt="Preview"
                                        />
                                    )}
                                    <input
                                        {...register("image")}
                                        name="image"
                                        type="file"
                                        id="fileInput"
                                        style={{ display: "none" }}
                                        onChange={handleFileInputChange}
                                    />
                                    <OtherInformation
                                        onClick={handleDeleteButtonClick}
                                        style={{
                                            width: "189px",
                                            marginTop: "30px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                textAlign: "left",
                                            }}
                                        >
                                            <a
                                                style={{
                                                    marginLeft: 0,
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                <i>
                                                    {t(
                                                        "form.shashin_o_sakujo_suru"
                                                    )}
                                                </i>
                                            </a>
                                        </p>
                                    </OtherInformation>
                                </DdTag>
                                <ValidationInquiry>
                                    <div>{imgErr && <p>{imgErr}</p>}</div>
                                </ValidationInquiry>
                            </Tr>
                        </Wrapper>
                        <Wrapper>
                            <CreatedDateComponents
                                dayRegister="create_day"
                                monthRegister="create_month"
                                yearRegister="create_year"
                                onBlur={handleBlur}
                                componentsName={t("form.sakusei_bi")}
                                onChangeYear={(e) =>
                                    setThisYear(e.target.value)
                                }
                                onChangeMonth={(e) =>
                                    setCurrentMonth(e.target.value)
                                }
                                onChangeDay={(e) =>
                                    setCurrentDay(e.target.value)
                                }
                                yearValue={thisYear ?? ""}
                                monthValue={currentMonth ?? ""}
                                dayValue={currentDay ?? ""}
                                yearName="create_year"
                                monthName="create_month"
                                dayName="create_day"
                            />
                            <ValidationInquiry
                                style={{ left: "40%", bottom: "30px" }}
                            >
                                <div>
                                    {createDayErr && <p>{createDayErr}</p>}
                                </div>
                            </ValidationInquiry>
                            <ValidationInquiry
                                style={{ left: "40%", bottom: "30px" }}
                            >
                                <div>
                                    {createMonthErr && <p>{createMonthErr}</p>}
                                </div>
                            </ValidationInquiry>
                            <ValidationInquiry
                                style={{ left: "40%", bottom: "30px" }}
                            >
                                <div>
                                    {createYearErr && <p>{createYearErr}</p>}
                                </div>
                            </ValidationInquiry>
                        </Wrapper>
                        <OtherInformation
                            onClick={handleSetCurrentDate}
                            style={{ borderRadius: "4px", margin: "auto" }}
                        >
                            <OtherContact style={{ borderRadius: "4px" }}>
                                <div>
                                    {t("form.kyou_no_hidzuke_o_hanei_suru")}
                                </div>
                            </OtherContact>
                        </OtherInformation>
                    </FormBox>
                </FooterContainer>
            </BasicContent>
            <ButtonBottom>
                <FooterBasic className="" style={{ opacity: 1 }}>
                    <ButtonSpace>
                        <MediumButton onClick={beforeSubmit}>
                            <ButtonNormal>
                                <span>{t("form.hozon_suru")}</span>
                            </ButtonNormal>
                        </MediumButton>
                    </ButtonSpace>
                    <ButtonSpace>
                        <MediumButton>
                            <ButtonNormal>
                                <Link to="/resume">
                                    <span>{t("form.burebyuu")}</span>
                                </Link>
                            </ButtonNormal>
                        </MediumButton>
                    </ButtonSpace>
                    <ButtonSpace>
                        <MediumButton onClick={createExcel}>
                            <ButtonSignup>
                                <span>{t("form.excel_de_daunroudo")}</span>
                            </ButtonSignup>
                        </MediumButton>
                    </ButtonSpace>
                </FooterBasic>
            </ButtonBottom>
        </form>
    );
}
export default Basic;
