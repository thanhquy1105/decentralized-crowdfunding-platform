import { Link } from "react-router-dom";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import dummyPic from "../assets/pg1.jpg";

export default function ScrollShowbarComponent(props) {
  const scroll = (val) => {
    document.getElementsByClassName("recentUploadsContainer")[0].scrollLeft +=
      val;
  };
  const renderCards = () => {
    return props.recentUploads.map((project, index) => {
      console.log(project.cid)
      return (
        <div className="projectCard" key={index} style={{paddingRight : "1rem"}}>
          <Link to="/project" state={{ index: project.index }}>
            <img
              className="cardImg"
              src={
                project.cid ? project.cid : dummyPic
              }
              alt="test-pic"
            />
          </Link>
          <div className="cardDetail">
            <div className="cardTitle">
              <Link to="/project" state={{ index: project.index }}>
                {project.projectName}
              </Link>
            </div>
            <div className="cardDesc">{project.projectDescription}</div>
            <div className="cardAuthor">{"Từ " + project.creatorName}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="recentUploads">
      <div className="recentUploadsHeader">
        <div className="recentUploadsHeading">{props.heading}</div>
        {props.recentUploads.length ? (
          <div className="scrollButtons">
            <BsArrowLeftCircle
              className="scrollNavBtn"
              onClick={() => scroll(-300)}
            />
            <BsArrowRightCircle
              className="scrollNavBtn"
              onClick={() => scroll(300)}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="recentUploadsContainer">
        {props.recentUploads.length ? (
          renderCards()
        ) : (
          <div className="noProjects">{props.emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
