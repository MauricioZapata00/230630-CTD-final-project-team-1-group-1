import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  return (
    <div className="search">
      <h1>Busca los productos que necesitas para tu evento</h1>
      <div className="search__form">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            onChange={handleChange}
            value={searchText}
            sx={{ ml: 1, flex: 1 }}
            placeholder="¿Qué estás buscando? ..."
            inputProps={{ "aria-label": "¿Qué estás buscando? ..." }}
            autoFocus
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
};

export default Search;
