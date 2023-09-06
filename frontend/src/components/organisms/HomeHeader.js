import { Note } from "../molecules/Note.js"
import { Status } from "../molecules/Status.js"

export const HomeHeader = () => {
    return (
    <div　className="flex">
        <Note />
        <Status />
    </div>
    );
  };
  