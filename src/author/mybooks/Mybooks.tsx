"use client"

import React from "react"
import { useRouter } from "next/navigation"
import AddEditBookModal, {
  type AddBookFormValues,
  type AddEditBookInitialValues,
  type BookFormType,
} from "@/components/common/addeditbookmodal/AddEditBookModal"
import FilterSearch from "@/components/common/filter/FIlterSearch"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import Stats from "@/components/common/stats/Stats"
import { Button } from "@/components/ui/button"
import BookCard from "@/src/author/mybooks/BookCard"
import { BookIcon, BookOpenIcon, EyeIcon, MessageCircleIcon } from "lucide-react"
import BookInfoModal, {
  type BookInfoData,
  buildChapterPreviews,
} from "@/components/common/bookinfomodal/BookInfoModal"

type BookRow = {
  id: string
  title: string
  coverImage: string
  status: "published" | "pending"
  genres: string[]
  rating: number
  reviews: number
  chapters: number
  likes: number
  views: number
  description: string
  bookType: BookFormType
  primaryGenre: string
  ageDemand: string
  tags: string[]
}

function bookToInitialValues(book: BookRow): AddEditBookInitialValues {
  return {
    title: book.title,
    description: book.description,
    type: book.bookType,
    genre: book.primaryGenre,
    ageDemand: book.ageDemand,
    tags: book.tags,
    coverImageUrl: book.coverImage,
  }
}

function bookInfoFromMyBooksRow(book: BookRow): BookInfoData {
  const moderationStatus: BookInfoData["moderationStatus"] =
    book.status === "published" ? "Published" : "Pending"
  const formatLabel = book.bookType === "novel" ? "Novel" : "Short Stories"

  return {
    id: book.id,
    title: book.title,
    coverSrc: book.coverImage,
    authorName: "You",
    authorRole: "Author",
    authorEmail: "author@example.com",
    authorAvatarSrc: "/author.jpg",
    moderationStatus,
    formatLabel,
    genres: book.genres,
    rating: book.rating,
    reviews: book.reviews,
    chapters: book.chapters,
    likes: book.likes,
    views: book.views,
    description: book.description,
    hashtags: book.tags.join(" "),
    chapterPreviews: buildChapterPreviews(book.chapters),
  }
}
function Mybooks() {
  const router = useRouter()
  const [bookModalOpen, setBookModalOpen] = React.useState(false)
  const [editingBook, setEditingBook] = React.useState<BookRow | null>(null)
  const [viewingBook, setViewingBook] = React.useState<BookRow | null>(null)
  const [viewingBookModalOpen, setViewingBookModalOpen] = React.useState(false)
  const modalInitialValues = React.useMemo(
    (): AddEditBookInitialValues | undefined =>
      editingBook ? bookToInitialValues(editingBook) : undefined,
    [editingBook]
  )

  const openAddBook = () => {
    setEditingBook(null)
    setBookModalOpen(true)
  }

  const openEditBook = (book: BookRow) => {
    setEditingBook(book)
    setBookModalOpen(true)
  }

  const openViewBook = (book: BookRow) => {
    setViewingBook(book)
    setViewingBookModalOpen(true)
  }

  const goAddChapters = (book: BookRow) => {
    const segment = encodeURIComponent(book.title)
    router.push(`/author/add-chapter/${segment}`)
  }

  const handleSaveBook = (values: AddBookFormValues) => {
    if (editingBook) {
      console.log("Update book", editingBook.id, values)
    } else {
      console.log("Create book", values)
    }
  }

  const search = {
    placeholder: "Search",
    value: "",
    onChange: (value: string) => {
      console.log(value)
    },
  }
  const selects = [
    {
      placeholder: "Select",
      options: ["Option 1", "Option 2", "Option 3"],
      value: "",
      onValueChange: (value: string) => {
        console.log(value)
      },
    },
  ]
  const stats = [
    {
      title: "Total Novels",
      value: 100,
      icon: <BookIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
    },
    {
      title: "Short Stories",
      value: 100,
      icon: <BookOpenIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
    },
    {
      title: "Pending",
      value: 100,
      icon: <EyeIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
    },
    {
      title: "Published",
      value: 100,
      icon: <MessageCircleIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
    },
  ]
  const books: BookRow[] = [
    {
      id: "1",
      title: "The Immortal’s Path",
      coverImage: "/bekas.jpg",
      status: "published",
      genres: ["Fantasy", "Romance", "Young Adult"],
      rating: 4.5,
      reviews: 100,
      chapters: 10,
      likes: 100,
      views: 100,
      description: "A sweeping fantasy about courage and friendship.",
      bookType: "novel",
      primaryGenre: "Fantasy",
      ageDemand: "13+",
      tags: ["#fantasy", "#adventure"],
    },
    {
      id: "2",
      title: "Book 2",
      coverImage: "/bekas.jpg",
      status: "published",
      genres: ["Mystery", "Thriller"],
      rating: 4.5,
      reviews: 100,
      chapters: 10,
      likes: 100,
      views: 100,
      description: "Short mysteries you can finish in one sitting.",
      bookType: "short_stories",
      primaryGenre: "Mystery",
      ageDemand: "16+",
      tags: ["#mystery", "#noir"],
    },
    {
      id: "3",
      title: "Book 3",
      coverImage: "/bekas.jpg",
      status: "published",
      genres: ["Science Fiction"],
      rating: 4.5,
      reviews: 100,
      chapters: 10,
      likes: 100,
      views: 100,
      description: "First contact, told from two timelines.",
      bookType: "novel",
      primaryGenre: "Science Fiction",
      ageDemand: "13+",
      tags: ["#scifi"],
    },
    {
      id: "4",
      title: "Book 4",
      coverImage: "/bekas.jpg",
      status: "pending",
      genres: ["Romance", "Contemporary"],
      rating: 4.5,
      reviews: 100,
      chapters: 10,
      likes: 100,
      views: 100,
      description: "Summer in the city, second chances.",
      bookType: "novel",
      primaryGenre: "Romance",
      ageDemand: "18+",
      tags: ["#romance", "#contemporary"],
    },
    {
      id: "5",
      title: "Book 5",
      coverImage: "/bekas.jpg",
      status: "published",
      genres: ["Horror"],
      rating: 4.5,
      reviews: 100,
      chapters: 10,
      likes: 100,
      views: 100,
      description: "Stories best read with the lights on.",
      bookType: "short_stories",
      primaryGenre: "Horror",
      ageDemand: "16+",
      tags: ["#horror"],
    },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="My Books"
          description="Manage your novel collection"
        />
        <Button
          type="button"
          variant="outline"
          className="hover:bg-black hover:text-white"
          onClick={openAddBook}
        >
          Add New Book
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Stats
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBackgroundColor={stat.iconBackgroundColor}
          />
        ))}
      </div>

      <FilterSearch search={search} selects={selects} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            coverImage={book.coverImage}
            status={book.status}
            genres={book.genres}
            rating={book.rating}
            reviews={book.reviews}
            chapters={book.chapters}
            likes={book.likes}
            views={book.views}
            onEdit={() => openEditBook(book)}
            onView={() => openViewBook(book)}
            onAddChapters={() => goAddChapters(book)}
            onDelete={() => {}}
          />
        ))}
      </div>

      <AddEditBookModal
        open={bookModalOpen}
        onOpenChange={(open) => {
          setBookModalOpen(open)
          if (!open) setEditingBook(null)
        }}
        initialValues={modalInitialValues}
        onSave={handleSaveBook}
      />
      <BookInfoModal
        open={viewingBookModalOpen}
        onOpenChange={(open) => {
          setViewingBookModalOpen(open)
          if (!open) {
            setViewingBook(null)
          }
        }}
        book={viewingBook ? bookInfoFromMyBooksRow(viewingBook) : null}
        showModerationActions={false}
      />
    </div>
  )
}

export default Mybooks