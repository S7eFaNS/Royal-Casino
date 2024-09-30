import { Carousel } from "./components/Carousel";
import { Heros } from "./components/Heros";
import { AppServices } from "./components/AppServices";
import { BlackjackTable } from "./components/BlackjackTable";

export const HomePage = () => {
    return(
      <div>
        <BlackjackTable />
        <Carousel />
        <Heros />
        <AppServices />
      </div>
    );
}
