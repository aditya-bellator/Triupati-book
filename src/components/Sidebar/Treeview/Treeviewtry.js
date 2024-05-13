import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Treeview.scss";
import style from "../Sidebar.module.scss";

const AllSports = [
  {
    id: 1,
    name: "Cricket",
    children: [
      {
        id: "1-1",
        name: "T 10 XI",
        children: [
          {
            id: "1-2-1",
            name: "Hydrabad XI v Chennai XI",
            children: [],
          },
        ],
      },
      {
        id: "1-2",
        name: "T 5 Xi",
        children: [
          {
            id: "1-2-1",
            name: "Item 2.1 kkkkkkkkk",
            children: [
              {
                id: "2-1",
                name: "Hydrabad XI v Chennai XI",
                children: [],
                link: "/match-detail",
              },
            ],
          },
        ],
      },
      {
        id: "1-3",
        name: "Vertual Cricket League",
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "Football",
    children: [
      {
        id: "2-1",
        name: "England Championship",
        children: [
          {
            id: "2-1-1",
            name: "Bristol City v Sunderland",
            children: [],
          },
          {
            id: "2-1-2",
            name: "Hull v Cardiff",
            children: [],
          },
        ],
      },
      {
        id: "2-2",
        name: "T 5 Xi",
        children: [
          {
            id: "2-2-1",
            name: "Item 2.1",
            children: [
              {
                id: "2-2-2-1",
                name: "Hydrabad XI v Chennai XI",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Tennis",
    children: [
      {
        id: "3-1",
        name: "England Championship",
        children: [
          {
            id: "3-1-1",
            name: "Bristol City v Sunderland",
            children: [],
          },
          {
            id: "3-1-2",
            name: "Hull v Cardiff",
            children: [],
          },
        ],
      },
      {
        id: "3-2",
        name: "T 5 Xi",
        children: [
          {
            id: "3-2-1",
            name: "Item 2.1",
            children: [
              {
                id: "3-2-1-1",
                name: "Hydrabad XI v Chennai XI",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Table Tennis",
    children: [
      {
        id: "4-1",
        name: "England Championship",
        children: [
          {
            id: "4-1-1",
            name: "Bristol City v Sunderland",
            children: [],
          },
          {
            id: "4-1-2",
            name: "Hull v Cardiff",
            children: [],
          },
        ],
      },
      {
        id: "4-2",
        name: "T 5 Xi",
        children: [
          {
            id: "4-2-1",
            name: "Item 2.1",
            children: [
              {
                id: "4-2-1-1",
                name: "Hydrabad XI v Chennai XI",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const TreeNode = ({ node }) => {

  console.log('node:::', node);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.treeNode}>
      <div
        className={`${style.nodeToogle} ${isExpanded ? "expanded" : ""}`}
        onClick={handleToggle}
      >
        {node.children.length > 0 && (
          <span
            className={
              isExpanded && node.children.length > 0 ? `${style.active}` : ""
            }
          ></span>
        )}
        {node.link ? <Link to={node.link}>{node.name}</Link> : node.name}
      </div>
      {isExpanded && (
        <ul className={style.childNodes}>
          {node.children.map((childNode) => (
            <li key={childNode.id}>
              <TreeNode node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TreeNode2 = ({ node, seriesList, handleSeriesList, seriesOpenSection }) => {

  console.log('node::', node);
  console.log('node:22222222::', seriesList);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedInner, setIsExpandedInner] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleInner = () => {
    setIsExpandedInner(!isExpandedInner);
  };

  return (
    <div className={style.treeNode}>
      <div
        className={`${style.nodeToogle} ${isExpanded ? "expanded" : ""}`}
        onClick={handleToggle}
      >
        {node.length > 0 && (
          <span
            className={
              isExpanded && node.length > 0 ? `${style.active}` : ""
            }
          ></span>
        )}

        <div onClick={() => handleSeriesList(node)}>
          {
            node && node.name ? node.name : null
          }
        </div>
        {/* {node.link ? <Link to={node.link}>{node.name}</Link> : node.name} */}
        {/* {node.link ? <Link to={node.link}>{node.name}</Link> : node.name} */}
      </div>
      {isExpanded && seriesOpenSection && (
        <ul className={style.childNodes}>
          {seriesList.map((childNode) => (
            <li key={childNode.id}>
              <TreeNode2 node={childNode} />
            </li>
          ))}
          {/* {seriesList && seriesList.length > 0 ?
            seriesList.map((innerElement, index) = (
              <>
                <li key={index}>
                  <TreeNode2  node={innerElement} />
                </li>
              </>
            )) : null
          } */}
        </ul>
      )}
    </div>
  );
};

const TreeView = (props) => {
  let { sportList, seriesList, handleSeriesList, seriesOpenSection } = props;

  let sportData = sportList;
  let seriesData = seriesList;

  console.log('???????????????', seriesList);

  return (

    <>
      {/* <div>
        {AllSports.map((rootNode) => (
          <TreeNode key={rootNode.id} node={rootNode} />
        ))}
      </div> */}

      <div>
        {sportData && sportData.length > 0 ?
          sportData.map((element, index) => (
            <TreeNode2 key={index} node={element} seriesList={seriesList} handleSeriesList={handleSeriesList} seriesOpenSection={seriesOpenSection} />
          )) : null}
      </div>

    </>
  );
};
export default TreeView;
