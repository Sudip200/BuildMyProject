
import React, { useState } from 'react';
import { Slider, Box, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const Filter = ({ mincost, maxcost, setMax, setMin, categories, selectedCategories, setSelectedCategories }:
  { mincost: number, maxcost: number, setMax: (value: number) => void, setMin: (value: number) => void, categories: string[], selectedCategories: string[], setSelectedCategories: (value: string[]) => void }
) => {
  const handleSliderChange = (event:Event, newValue:number[]) => {
    setMin(newValue[0]);
    setMax(newValue[1]);
  };

  const handleCategoryChange = (event) => {
    if(!selectedCategories.includes(event.target.name)){
      setSelectedCategories([...selectedCategories, event.target.name]);
    }else{
      setSelectedCategories(selectedCategories.filter((category)=>category!==event.target.name));
    }
  };

  return (
    <Box className="h-full bg-gray-900 p-4 rounded-md" sx={{ color: 'white' }}>
      <Typography variant="h6" gutterBottom>
        Filter by Cost
      </Typography>
      <Slider
        value={[mincost, maxcost]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000}
        sx={{
          color: 'primary.main',
          '& .MuiSlider-thumb': {
            backgroundColor: 'white',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'gray',
          },
          '& .MuiSlider-track': {
            backgroundColor: 'white',
          },
        }}
      />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body2">Min: {mincost}</Typography>
        <Typography variant="body2">Max: {maxcost}</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                name={category}
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={category}
            sx={{ color: 'white' }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default Filter;