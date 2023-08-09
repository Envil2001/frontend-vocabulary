import React, { useEffect, useState } from "react";
import "./TestPage.css"
import { Container, MainLayout } from "../../components";

import axios from "../../app/axios"
export const TestPage = () => {
    // const questions = [
    //     {
    //         questionText: "What is the capital of France?",
    //         answerOptions: [
    //             { answerText: "New York", isCorrect: false },
    //             { answerText: "London", isCorrect: false },
    //             { answerText: "Paris", isCorrect: true },
    //             { answerText: "Dublin", isCorrect: false }
    //         ]
    //     },
    //     {
    //         questionText: "Who is CEO of Tesla?",
    //         answerOptions: [
    //             { answerText: "Jeff Bezos", isCorrect: false },
    //             { answerText: "Elon Musk", isCorrect: true },
    //             { answerText: "Bill Gates", isCorrect: false },
    //             { answerText: "Tony Stark", isCorrect: false }
    //         ]
    //     },
    //     {
    //         questionText: "The iPhone was created by which company?",
    //         answerOptions: [
    //             { answerText: "Apple", isCorrect: true },
    //             { answerText: "Intel", isCorrect: false },
    //             { answerText: "Amazon", isCorrect: false },
    //             { answerText: "Microsoft", isCorrect: false }
    //         ]
    //     },
    //     {
    //         questionText: "How many Harry Potter books are there?",
    //         answerOptions: [
    //             { answerText: "1", isCorrect: false },
    //             { answerText: "4", isCorrect: false },
    //             { answerText: "6", isCorrect: false },
    //             { answerText: "7", isCorrect: true }
    //         ]
    //     }
    // ];
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    useEffect(() => {
        // Здесь делаем запрос на бекенд, чтобы получить список слов и их переводов.
        // Используем axios для выполнения GET-запроса к API.

        // Пример запроса:
        axios.get("/fields/field/64c7fd3ab2f24890873828b0")
            .then((response) => {
                const data = response.data.words;
                // Обработай полученные данные и создай структуру для вопросов и вариантов ответов.
                // Например:
                const newQuestions = data.map((word) => ({
                    questionText: word.title,
                    answerOptions: [
                        { answerText: word.translate, isCorrect: true },
                        // Здесь ты можешь добавить случайные варианты ответов на основе других слов из базы данных.
                        // Например, взять 3 случайных перевода из других слов.
                        // Для этого создай функцию, которая случайным образом выбирает неправильные варианты.
                        // Например:
                        { answerText: getRandomAnswer(data, word._id), isCorrect: false },
                        { answerText: getRandomAnswer(data, word._id), isCorrect: false },
                        { answerText: getRandomAnswer(data, word._id), isCorrect: false },
                    ],
                }));
                setQuestions(newQuestions);
            })
            .catch((error) => console.error("Error fetching words:", error));
    }, []);


    // Функция для выбора случайного перевода из других слов, исключая правильный перевод.
    const getRandomAnswer = (words, currentWordId) => {
        const otherWords = words.filter((word) => word._id !== currentWordId);
        const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        return randomWord.translate;
    };

    return (
        <MainLayout>
            <Container>
                <div className="app">
                    {showScore ? (
                        <div className="score-section">
                            You scored {score} out of {questions.length}
                        </div>
                    ) : (
                        <>
                            <div className="question-section">
                                <div className="question-count">
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className="question-text">
                                    {questions[currentQuestion]?.questionText}
                                </div>
                            </div>
                            <div className="answer-section">
                                {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                                    <button
                                    key={index}
                                        onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    >
                                        {answerOption.answerText}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </MainLayout>

    );
}
