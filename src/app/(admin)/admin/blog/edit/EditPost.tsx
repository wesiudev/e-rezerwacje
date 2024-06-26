"use client";
import { updateBlogPost } from "@/firebase";
import { useState } from "react";
import { FaLink, FaLongArrowAltLeft } from "react-icons/fa";
import * as Scroll from "react-scroll";
import PostImages from "./PostImages";
import EditSection from "./EditSection";
import { EditorState } from "draft-js";
import SectionContentEditor from "../new/PostSections/SectionContentEditor";
import SectionsList from "../new/PostSections/SectionsList";
import { polishToEnglish } from "../../../../../../lib/polishToEnglish";
import { renderMarkdown } from "../../../../../../lib/parseMarkdown";
export default function EditPost({
  selectedPost,
  setSelectedPost,
}: {
  selectedPost: any;
  setSelectedPost: Function;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [sectionInput, setSectionInput] = useState("");
  const [sectionContent, setSectionContent] = useState("");
  const [selectedSection, setSelectedSection] = useState({
    title: "",
    content: EditorState.createEmpty(),
    id: 0,
  });
  const [messageVisible, setMessageVisible] = useState(false);
  const addSection = (value: string) => {
    setSelectedPost((prevInput: any) => ({
      ...prevInput,
      sections: [
        ...prevInput.sections,
        { title: value, content: sectionContent },
      ],
    }));
  };

  let ScrollTo = Scroll.Link;
  {
    /* {"![alt text](image-url) [link text](link-url)"} */
  }

  const removeSection = (idx: number) => {
    const newSections = [...selectedPost.sections];
    newSections.splice(idx, 1);
    setSelectedPost({ ...selectedPost, sections: newSections });
  };

  const [sectionEditorOpen, setSectionEditorOpen] = useState(true);

  return (
    <div className="relative">
      {messageVisible && (
        <div
          className={`bg-green-500 text-3xl w-screen lg:w-max h-max p-12 fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] flex items-center justify-center`}
        >
          Twój link do posta to: /{polishToEnglish(selectedPost.title)}
        </div>
      )}

      <EditSection
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        setSectionEditorOpen={setSectionEditorOpen}
        sectionEditorOpen={sectionEditorOpen}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2  pr-0 text-white gap-y-6 w-full ">
        <div className="flex flex-col space-y-3 w-full bg-[#13151f] px-5 pb-12">
          <button
            onClick={() => setSelectedPost()}
            className="flex flex-row items-center pt-24 text-2xl"
          >
            <FaLongArrowAltLeft className="mr-3" />
            Powrót
          </button>
          <h1 className="w-full text-3xl text-white font-bold pt-12">
            Edytujesz post
          </h1>
          <div className="grid grid-cols-1 text-lg h-max w-full">
            <PostImages
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
            />
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col my-3 space-y-3">
                {" "}
                Tytuł
                <textarea
                  placeholder="Wpisz tytuł..."
                  rows={5}
                  value={selectedPost.title}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, title: e.target.value })
                  }
                  className="!text-black mt-1 bg-slate-400 p-2 outline-none placeholder:text-gray-500 scrollbarMain resize-none"
                />
              </div>
              <div className="flex flex-col my-3 space-y-3">
                Tytuł SEO
                <textarea
                  placeholder="Wpisz tytuł SEO... (max 60 znaków)"
                  rows={5}
                  value={selectedPost.metaTitle}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      metaTitle: e.target.value,
                    })
                  }
                  className="!text-black mt-1 bg-slate-400 p-2 outline-none placeholder:text-gray-500 scrollbarMain resize-none"
                />
              </div>
              <div className="flex flex-col my-3 space-y-3">
                Opis SEO
                <textarea
                  placeholder="Wpisz opis SEO... (max 160 znaków)"
                  rows={5}
                  value={selectedPost.metaDescription}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost,
                      metaDescription: e.target.value,
                    })
                  }
                  className="!text-black mt-1 bg-slate-400 p-2 outline-none placeholder:text-gray-500 scrollbarMain resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col my-3 space-y-3">
              {" "}
              Wstęp
              <textarea
                placeholder="Wpisz tekst..."
                rows={6}
                value={selectedPost.intro}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, intro: e.target.value })
                }
                className="!text-black bg-slate-400 mt-1 p-2 outline-none placeholder:text-gray-500  scrollbarMain resize-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col w-full my-3">
                <div className="flex flex-col space-y-3">
                  Tytuł sekcji
                  <input
                    placeholder="Wpisz tekst..."
                    value={sectionInput}
                    onChange={(e) => setSectionInput(e.target.value)}
                    className="!text-black bg-slate-400 mt-1 p-2 outline-none placeholder:text-gray-500"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  Treść sekcji
                  <textarea
                    className="!text-black bg-slate-400 mt-1 p-2 placeholder:text-gray-500 outline-none "
                    placeholder="Wpisz treść sekcji..."
                    value={sectionContent}
                    onChange={(e) => setSectionContent(e.target.value)}
                  />
                </div>
              </div>
              <button
                value={sectionInput}
                onClick={(e: any) => {
                  addSection(e.target.value), setSectionInput("");
                }}
                className="!text-lg w-full bg-blue-500 hover:bg-blue-700 duration-200 text-white flex flex-row items-center justify-center mt-3 outline-none py-2 mb-2"
              >
                Dodaj
              </button>
              <div className="text-black !font-coco">
                <SectionContentEditor
                  addSection={addSection}
                  removeSection={removeSection}
                />
                <SectionsList
                  input={selectedPost}
                  setSelectedSection={setSelectedSection}
                  setSectionEditorOpen={setSectionEditorOpen}
                  removeSection={removeSection}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col my-3">
            {" "}
            Zakończenie
            <input
              placeholder="Wpisz tekst..."
              value={selectedPost.outro}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, outro: e.target.value })
              }
              className="!text-black  bg-slate-400 mt-1 p-2 outline-none placeholder:text-gray-500"
              type="text"
            />
          </div>

          {selectedPost.url !== "" && (
            <button
              onClick={() => {
                updateBlogPost(selectedPost.postId, selectedPost);
                setIsAdded(true);
              }}
              disabled={isAdded}
              className="disabled:cursor-not-allowed py-6 bg-green-500 text-2xl text-white hover:bg-green-400 duration-200"
            >
              {isAdded && "POMYŚLNIE ZAAKTUALIZOWANO"}
              {!isAdded && "AKTUALIZUJ"}
            </button>
          )}
        </div>
        <div className="flex flex-col relative w-full ">
          <div className="absolute w-full z-[50]">
            <div className="fixed h-screen overflow-y-scroll scrollbarMain w-full">
              <h1 className="w-full px-3 pl-12 text-3xl text-white font-bold z-[50] pt-24 mt-[50px]">
                Podgląd
              </h1>
              <div className="flex flex-col p-12  prose lg:prose-xl prose-invert pr-28">
                <h1 className="leading-relaxed font-bold">
                  {selectedPost.title}
                </h1>
                <h3 className="italic  leading-relaxed font-italic font-light">
                  <div
                    dangerouslySetInnerHTML={renderMarkdown(selectedPost.intro)}
                  />
                </h3>
                {selectedPost.sections.length > 0 && (
                  <p className="">W tym poście przeczytasz o:</p>
                )}
                <div className="flex flex-col ml-6">
                  {selectedPost.sections.length > 0 &&
                    selectedPost.sections.map((section: any, idx: number) => (
                      <h4 key={idx} className="relative h-12">
                        <ScrollTo
                          className=" text-blue-400 flex flex-row items-center cursor-pointer hover:bg-gray-100 duration-150 absolute left-0 top-0 z-20 h-full w-full"
                          activeClass="active"
                          to={`${polishToEnglish(section.title)}`}
                          spy={true}
                          smooth={true}
                          offset={50}
                          duration={500}
                        >
                          <FaLink className="text-gray-500 mr-2 min-w-[25px]" />{" "}
                          {section.title}
                        </ScrollTo>
                      </h4>
                    ))}
                </div>

                {selectedPost.sections.map((section: any, idx: number) => (
                  <div id={`${polishToEnglish(section.title)}`} key={idx}>
                    <h3 key={idx} className="font-bold">
                      {section.title}
                    </h3>

                    <div
                      dangerouslySetInnerHTML={renderMarkdown(section.content)}
                    />
                  </div>
                ))}
                <h3 className="italic  leading-relaxed font-italic font-light">
                  {selectedPost.outro}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
