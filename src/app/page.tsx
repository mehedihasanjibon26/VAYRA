
import BookIntro from "@/components/intro/BookIntro";
import ChapterTwo from "@/components/chapters/ChapterTwo";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <BookIntro />

      <div className={styles.chapterOverlay}>
        <ChapterTwo />
      </div>
    </main>
  );
}

