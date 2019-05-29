import React, { FunctionComponent } from "react";

import "./HomePage.scss";

const HomePage: FunctionComponent = (props) => {
  return (
    <div className="home-page">
      <h1>Hello! Welcome!</h1>
      <p>
        <u>adminDashboard</u> is a React Typescript project with reusable components.
        It contains a D3.js line chart, a search bar working with
        query strings, a gallery which you can edit heading or
        delete images; a complex calendar component with the
        functions of adding a new note by dragging the cursor,
        saving or cancelling notes, editing them or deleting them
      </p>
      <ul>
        <li>An animated dynamic <u>D3.js</u> line chart</li>
        <li>A report listing system with a <u>search bar</u> using <u>query strings</u> to
          retrieve data.
        </li>
        <li>A gallery which you can edit headings or delete images</li>
        <li>A complex <u>calendar</u> with picking a time range, showing
          dates in different <u>day and week formats</u>; create, edit or delete
          notes on different dates, setting date a range by dragging the cursor.
        </li>
        <li>A simple settings page</li>
      </ul>
      <p>There are more little funcionalities which you will encounter, 
      </p>
    </div>
  );
};

export default HomePage;
