import { CONFIG } from "@/utils/config";
import app from "@/app";

app.listen(CONFIG.PORT, () => {
  console.log(`[SERVER]: Running in ${CONFIG.NODE_ENV} mode`);
  console.log(`[SERVER]: Listening at http://localhost:${CONFIG.PORT}/`);
});
