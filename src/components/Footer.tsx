import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  margin-top: 50px;
  height: 80px;
  ul {
    display: flex;
    justify-content: center;
    font-size: 1.3rem;
    flex-wrap: wrap;
    gap: 10px;
  }
  li {
    border-right: 1px solid #000;
    padding: 0 10px;
    line-height: 0.75;
  }
`;

const Footer = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <ul>
                <li>
                    <Link to="/information">
                        {t("common.kojin_johono_toriatsukaini_tsuite")}
                    </Link>
                </li>
                <li>
                    <Link to="/privacy">{t("common.kojin_joho_hogohoshin")}
                    </Link>
                </li>
                <li>
                    <Link to="/agree">{t("common.riyokiyaku")}</Link>
                </li>
                <li>
                    <Link to="/accessibility">{t("common.suisho_kankyo")}</Link>
                </li>
                <li>
                    <Link to="/jobSeekers">{t("top.otoiawase")}</Link>
                </li>
                <li>
                    <Link to="/">{t("top.unei_gaisha")}</Link>
                </li>
                <li>
                    <Link to="/prf">Test</Link>
                </li>
            </ul>
        </Wrapper>
    );
};

export default Footer;
