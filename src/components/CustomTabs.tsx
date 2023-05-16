import React from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
interface CustomTabsProps {
    tabs: { title: string; color: string }[];
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    styles?: React.CSSProperties;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, selected, setSelected, styles }) => {
    return (
        <Box component="div" className="tabs" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {tabs.map((tab) => (
                <motion.div
                    key={tab.title}
                    className={`tab ${selected === tab.title ? "selected" : ""}`}
                    style={{
                        color: selected === tab.title ? tab.color : "black",
                        ...styles
                    }}
                    onClick={() => setSelected(tab.title)}
                    layout
                >
                    {tab.title}
                    {selected === tab.title && (
                        <motion.div
                            className="underline"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7 }}
                            style={{
                                backgroundColor: tab.color,
                                height: "2px",
                                width: "100%",
                                bottom: "-6px",
                                left: 0
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </Box>
    );
};

export default CustomTabs;