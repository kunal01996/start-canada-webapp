declare namespace Database {
    export type QuizCategory = {
      id: number;
      name: string;
      description?: string;
      image?: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      subcategories: QuizSubcategory[];
      levels: QuizLevel[];
      quizzes: Quiz[];
    };
  
    export type QuizSubcategory = {
      id: number;
      categoryId: number;
      category: QuizCategory;
      name: string;
      description?: string;
      image?: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      levels: QuizLevel[];
      quizzes: Quiz[];
    };
  
    export type QuizLevel = {
      id: number;
      categoryId: number;
      subCategoryId: number;
      category: QuizCategory;
      subcategory: QuizSubcategory;
      name: string;
      description?: string;
      image?: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      quizzes: Quiz[];
    };
  
    export type Quiz = {
      id: number;
      categoryId: number;
      subCategoryId: number;
      levelId: number;
      category: QuizCategory;
      subcategory: QuizSubcategory;
      level: QuizLevel;
      name: string;
      description?: string;
      duration?: number;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      attempts: UserTestAttempt[];
    };
  
    export type QuestionType = {
      id: number;
      name: string;
      description?: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      questions: Question[];
    };
  
    export type Question = {
      id: number;
      questionDesc: string;
      questionTypeId: number;
      questionType: QuestionType;
      score: number;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      questionAnswers: QuestionToAnswer[];
      userAnswers: UserQuestionAnswer[];
    };
  
    export type Answer = {
      id: number;
      description: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      questionAnswers: QuestionToAnswer[];
      userAnswers: UserQuestionAnswer[];
    };
  
    export type QuestionToAnswer = {
      questionId: number;
      answerId: number;
      isCorrect: boolean;
      feedback?: string;
      createdAt: Date;
      updatedAt: Date;
  
      question: Question;
      answer: Answer;
    };
    
    export type User = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: any;
      firstName: string;
      lastName: string;
      email: string;
      image: string | null;
      dob: Date | null;
      gender: string | null;
      countryOfOrigin: string | null;
      fieldOfStudy: string | null;
      password: string;
      isEnabled: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      typeId: number;
      type?: UserType;
  
      testAttempts?: UserTestAttempt[];
    };
  
    export type UserType = {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date;
  
      users: User[];
    };
  
    export type UserTestAttempt = {
      id: number;
      userId: number;
      quizId: number;
      attemptDate: Date;
      score?: number; // Decimal type, adapt accordingly if needed
      createdAt: Date;
      updatedAt: Date;
  
      user: User;
      quiz: Quiz;
      answers: UserQuestionAnswer[];
      feedbacks: UserFeedback[];
    };
  
    export type UserQuestionAnswer = {
      id: number;
      userTestAttemptId: number;
      questionId: number;
      answerId: number;
      isCorrect: boolean;
      createdAt: Date;
      updatedAt: Date;
  
      userTestAttempt: UserTestAttempt;
      question: Question;
      answer: Answer;
    };
  
    export type UserFeedback = {
      id: number;
      userTestAttemptId: number;
      feedback: string;
      createdAt: Date;
      updatedAt: Date;
  
      userTestAttempt: UserTestAttempt;
    };
  }

  declare namespace Notification {
    export type SuccessNotification = {
      type: 'success',
      message: string
    }

    export type ErrorNotification = {
      type: 'error',
      message: string
    }
  }
  