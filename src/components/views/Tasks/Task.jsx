import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { cardData } from "./data";
import { Card } from "../../Card/Card";
import "./Task.styles.css";

export const Task = () => {
  const { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 135)
      return { string: str.slice(0, 135).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return cardData.map((data) => <Card key={data.id} data={data} />);
  };

  return (
    <>
      <Header />
      <main id="tasks">
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs.</h6>
                  <h5>Camilo Garzón</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>
                    {
                      limitString(`Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Aliquid expedita voluptatem ab commodi
                    quam quos deserunt beatae hic, ad harum autem quibusdam
                    neque at quae eaque ea inventore ut similique. Magnam
                    tenetur culpa minus laudantium vero quia adipisci veniam ex
                    corporis laborum distinctio, nam suscipit quam id error
                    inventore? Veniam minima placeat illo perferendis iste
                    necessitatibus ea temporibus totam quaerat? Magni nostrum
                    consequatur numquam dolores quis modi est rem sapiente
                    accusamus, quisquam pariatur ducimus explicabo, reiciendis
                    reprehenderit totam corrupti necessitatibus. Illum dolores
                    corporis eius dolorem quaerat pariatur ratione animi
                    explicabo? At soluta nesciunt deserunt facilis qui
                    asperiores eaque, eligendi aut aliquam in nam? Saepe
                    voluptatibus illum autem recusandae, nihil labore quibusdam,
                    voluptatem aut laudantium assumenda possimus fugit officia
                    amet? Quos! Labore dolore omnis adipisci est quaerat
                    suscipit, unde iure soluta. Quo iste quos nam illo quidem! A
                    blanditiis dolorem dolor expedita eveniet beatae, quo
                    explicabo, aspernatur, laudantium molestiae maiores
                    inventore!`).string
                    }
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs.</h6>
                  <h5>Camilo Garzón</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake...</p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/01/2022 16:40 hs.</h6>
                  <h5>Camilo Garzón</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake...</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
