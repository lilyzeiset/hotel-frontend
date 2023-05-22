import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Homepage for the site
 */
export default function Home() {

  const {t, i18n} = useTranslation();

  return (
    <Typography variant="h4">
      {t('get-started')}
    </Typography>
  )
}