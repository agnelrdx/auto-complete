import { useState } from "react";

import Autocomplete, { Option } from "./components/Autocomplete";
import reactLogo from "./assets/images/react.svg";
import "./assets/css/app.css";

const App = () => {
  const [image, selectedImage] = useState<Option | null>(null);

  return (
    <div className="card">
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1>React AutoComplete</h1>

      <Autocomplete
        placeholder="Search your photos here...eg: accus.."
        onSelection={selectedImage}
      />

      {image && (
        <img className="card__image" src={image.url} alt={image.title} />
      )}
    </div>
  );
};

export default App;
