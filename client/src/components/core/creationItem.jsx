import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Mardown from "react-markdown";

const CreationItem = ({ item, expanded, onChange }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      className="max-w-5xl bg-white border border-gray-200 rounded-2xl 
                 transition-all duration-300 ease-in-out
                 hover:shadow-lg hover:border-blue-300 hover:scale-[1.01]"
    >
      {/* Accordion Summary */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="p-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div>
            <Typography variant="h6">{item.prompt}</Typography>
            <Typography variant="body2" className="text-gray-500">
              {item.type} - {new Date(item.created_at).toLocaleDateString()}
            </Typography>
          </div>

          <Button
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: "#EFF6FF",
              borderColor: "#BFDBFE",
              color: "#1E40AF",
              borderRadius: "9999px",
              textTransform: "none",
              px: 2,
              py: 0.5,
            }}
          >
            {item.type}
          </Button>
        </div>
      </AccordionSummary>

      {/* Accordion Details */}
      <AccordionDetails>
        {item.type === "image" ? (
          <div>
            <img
              src={item.content}
              alt="image"
              className="mt-3 w-full max-w-md rounded"
            />
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-auto text-sm text-gray-700">
            <div className="reset-tw">
              <Mardown>{item.content}</Mardown>
            </div>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CreationItem;
