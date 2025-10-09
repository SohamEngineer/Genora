import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Markdown from "react-markdown";

const Accordino = ({ item, expanded, onChange ,style, className}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      tabIndex={0}
            style={style}

      className={`${className} max-w-full border border-gray-700   
                 transition-all duration-300 ease-in-out
                 hover:shadow-lg  hover:scale-[1.01]
                 bg-black text-white `}
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        backdropFilter: "blur(10px)",
        color: "white",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 8px 24px rgba(59, 130, 246, 0.5)",
        },
        "&:focus-visible": {
          outline: "2px solid #3B82F6",
          outlineOffset: "2px",
        },
        "& .MuiAccordionSummary-content": { color: "white" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} className="p-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div>
            <Typography variant="h6" className="text-white">
              {item.prompt}
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </Typography>
          </div>

          <Button
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: "#1E3A8A",
              borderColor: "#3B82F6",
              color: "white",
              borderRadius: "9999px",
              textTransform: "none",
              px: 2,
              py: 0.5,
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#3B82F6",
                color: "white",
                transform: "scale(1.05)",
              },
            }}
          >
            {item.type}
          </Button>
        </div>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          transition: "max-height 0.3s ease",
        }}
      >
        {(item.type === "ai-image" || item.type === "bg-remover") ? (
          <div>
            <img
              src={item.content}
              alt="image"
              className="mt-3 w-full max-w-md rounded"
            />
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-auto text-sm text-gray-300">
            <div className="reset-tw">
              <Markdown>{item.content}</Markdown>
            </div>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordino;
