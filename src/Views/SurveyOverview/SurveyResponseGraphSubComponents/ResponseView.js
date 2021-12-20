import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import ChartView from "../../components/common/GraphicalViews/ChartView";
import TextView from "../../components/common/GraphicalViews/TextView";
import MaterialDropdown from "../../components/common/DropDown/MaterialDropdown";
import { chartTypes } from "../../../util/enumerations";
import "../SurveyOrverView.css";
import BrootStrapDropdown from "../../components/common/DropDown/BrootStrapDropdown";

const ResponseView = ({ chartData, index }) => {
  const [selectedCartType, setSelectedCartType] = useState(chartData.chartType);

  const handleChartTypeChange = (value) => {
    setSelectedCartType(value);
  };

  return (
    <Grid container spacing={1} className="response-view-chart">
      {chartData.totalResponsesCount ? (
        <>
          <Grid item xs={12} md={12} lg={8}>
            {chartData.chartType !== "text" ? (
              <ChartView chartData={chartData} index={index} />
            ) : (
              <TextView chartData={chartData} />
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {chartData.chartType !== "text" && (
              <div className="chart-select-dropdown">
                <BrootStrapDropdown
                  label="Chart type"
                  handleSelect={handleChartTypeChange}
                  options={chartTypes}
                  value={chartData.chartType}
                  disabled={true}
                />
              </div>
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
};

ResponseView.propTypes = {
  chartData: PropTypes.object,
  index: PropTypes.number,
};

export default ResponseView;
