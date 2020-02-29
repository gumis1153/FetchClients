import React from "react";
import styles from "../../views/root/App.module.scss";
import Table from "../../components/table/Table";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function App() {
  return (
    <section className={styles.App}>
      <div className={styles.wrapper}>
        <Header />
        <Table />
        <Footer />
      </div>
    </section>
  );
}

export default App;
