import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "../../UI";
import { Container, Form, MainLayout, Title } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchFieldbyId } from "../../features/fields/fieldsApiSlice";
import { useParams } from "react-router-dom";
import "./QuizPage.css"



export const Quiz = () => {
    const dispatch = useDispatch();
    const { id } = useParams();


    const [started, setStarted] = useState(false);
    const [showResult, setsShowResult] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(0); // Состояние для активного индекса вопроса
    const [result, setResult] = useState({
        correctAnswers: 0,
        wrongAnswers: 0,
    })


    const { field, loading } = useSelector((state) => state.fields);
    useEffect(() => {
        dispatch(fetchFieldbyId(id));
    }, [dispatch, id]);

    function getRandomElements(array, count) {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
    }
    // Функция, которая возвращает случайный элемент из массива
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
    const mode1 = () => {
        const results = [];

        // Перебираем каждое слово
        field?.words?.forEach((word) => {
            const allTranslations = field.words.map((w) => w.translate);
            const otherTranslations = allTranslations.filter((translation) => translation !== word.translate);
            const randomTranslations = getRandomElements(otherTranslations, 3);
            const translationsArray = [word.translate, ...randomTranslations];
            const shuffledTranslations = getRandomElements(translationsArray, 4);
            const result = {
                title: word.title,
                translate: word.translate,
                translations: shuffledTranslations,
                mode: "4Answers",
            };
            results.push(result);
        });

        return results;
    }
    // Основная функция для обработки массива слов
    const mode2 = () => {
        const results = [];

        field?.words?.forEach((word) => {
            // Получаем все переводы из слова
            const allTranslations = field.words.map((w) => w.translate);

            // // Получаем случайное слово из массива words, вероятность 50/50
            const randomWord = Math.random() < 0.5 ? word.translate : getRandomElement(allTranslations);

            // Создаем объект с информацией о слове и переводах
            const result = {
                title: word.title,
                translate: word.translate,
                isCorrect: randomWord === word.translate,
                wordTranslate: randomWord,
                mode: "TrueFalse",
            };

            // Добавляем объект в массив результатов
            results.push(result);
        });

        return results;
    };
    function mergeArraysRandomly(arr1, arr2, fixedLength) {
        // Объединяем массивы
        const mergedArray = arr1.concat(arr2);

        // Перемешиваем элементы в массиве
        for (let i = mergedArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
        }

        // Обрезаем массив до фиксированной длины, если необходимо
        if (fixedLength && mergedArray.length > fixedLength) {
            mergedArray.length = fixedLength;
        }

        return mergedArray;
    }
    const fixedLength = 10; // Замените 10 на желаемую фиксированную длину массива
    const mergedArray = useMemo(() => mergeArraysRandomly(mode1(), mode2(), fixedLength), [field?.words]);

    const handleStart = () => {
        setStarted(true);
        setResult({ correctAnswers: 0, wrongAnswers: 0 })
    }

    const handleAnswerClick = (index) => {
        setSelectedAnswerIndex(index);
    };
    const onClickNext = () => {
        if (activeQuestion < mergedArray.length) {
            setSelectedAnswerIndex(null); // Сброс выбранного ответа при переходе к следующему вопросу
            setActiveQuestion(prevIndex => prevIndex + 1);
            if (mergedArray[activeQuestion].mode === '4Answers') {
                const isCorrect = mergedArray[activeQuestion].translations[selectedAnswerIndex] === mergedArray[activeQuestion].translate;
                setResult((prev) =>
                    isCorrect
                        ? {
                            ...prev,
                            correctAnswers: prev.correctAnswers + 1,
                        }
                        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
                )
            } else if (mergedArray[activeQuestion].mode === "TrueFalse") {
                const isTrue = selectedAnswerIndex === 0;
                const isCorrect = mergedArray[activeQuestion].isCorrect === isTrue;
                setResult((prev) =>
                    isCorrect
                        ? {
                            ...prev,
                            correctAnswers: prev.correctAnswers + 1,
                        }
                        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
                )
            }
        } else {
            setsShowResult(true)
        }
    }
    return (
        <MainLayout>
            <Container>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {!started ?
                            (
                                <div>
                                    <Button onClick={handleStart}>Старт</Button>
                                    <Input placeholder="Input a " />
                                </div>
                            )
                            :


                            (
                                <>
                                    {activeQuestion < mergedArray.length ?
                                        (
                                            <div>
                                                {mergedArray[activeQuestion].mode === '4Answers' && (
                                                    <>
                                                        <div className="quiz-question">
                                                            <div className="question-title">
                                                                <h3 class="question-heading">
                                                                    <div>{activeQuestion}</div>
                                                                    <div class="fraction-part-small">{fixedLength}</div>
                                                                </h3>
                                                                <Title title={mergedArray[activeQuestion].title} />
                                                            </div>
                                                            <div className="options">
                                                                {mergedArray[activeQuestion].translations.map((answer, index) => (
                                                                    <div
                                                                        onClick={() => handleAnswerClick(index)}
                                                                        key={answer}
                                                                        className={selectedAnswerIndex === index ? 'option selected-answer' : 'option'}
                                                                    >
                                                                        <div class="options-item">
                                                                            <div class="option-item__index">{index}</div>
                                                                            <div class="text-start">{answer}</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <Button disabled={selectedAnswerIndex === null} onClick={onClickNext} stylesElement={{ margin: "0 auto" }}>
                                                            {activeQuestion === mergedArray.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </>
                                                )}
                                                {mergedArray[activeQuestion].mode === "TrueFalse" && (
                                                    <>
                                                        <div>
                                                            <h2>{mergedArray[activeQuestion].title}</h2>
                                                            <p>{mergedArray[activeQuestion].translate}</p>
                                                            <ul>
                                                                <li className={selectedAnswerIndex === 0 ? 'selected-answer' : null} onClick={() => handleAnswerClick(0)}>True</li>
                                                                <li className={selectedAnswerIndex === 1 ? 'selected-answer' : null} onClick={() => handleAnswerClick(1)}>False</li>
                                                            </ul>
                                                        </div>
                                                        <Button disabled={selectedAnswerIndex === null} onClick={onClickNext} stylesElement={{ margin: "0 auto" }}>
                                                            {activeQuestion === mergedArray.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </>

                                                )
                                                }
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="quiz-container">
                                                <div className="results-box">
                                                    <div className="results-content">
                                                        <Title title="Results" />
                                                    </div>
                                                    <div className="nice-try-box">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4">
                                                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                                            <path d="M4 22h16"></path>
                                                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                                        </svg>
                                                        <div className="nice-try-box__info">
                                                            <span className="nice-try-text">Nice try!</span>
                                                            <span className="accuracy-text">&lt; 25% accuracy</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="question-box">
                                                    {/* Дополнительный контент для блока с вопросами */}
                                                </div>
                                                <div className="results-box">
                                                    {/* Дополнительный контент для блока с результатами */}
                                                </div>
                                            </div>
                                        )
                                    }


                                </>
                            )
                        }
                        <div className="score">
                            Score: {result.correctAnswers} Correct, {result.wrongAnswers} Wrong
                        </div>
                    </>
                )
                }
            </Container>
        </MainLayout >
    )
}