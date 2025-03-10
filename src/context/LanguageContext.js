import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ka: {
    // Georgian (Default)
    home: {
      welcome: 'მოგესალმებით ჩვენს მაღაზიაში',
      discover: 'აღმოაჩინეთ საუკეთესო პროდუქტები საუკეთესო ფასად',
      shopNow: 'იყიდეთ ახლავე'
    },
    nav: {
      home: 'მთავარი',
      products: 'პროდუქტები',
      cart: 'კალათა',
      myStore: 'ჩემი მაღაზია',
      login: 'შესვლა',
      register: 'რეგისტრაცია',
      logout: 'გასვლა',
      settings: 'პარამეტრები'
    },
    products: {
      addProduct: 'პროდუქტის დამატება',
      productName: 'პროდუქტის სახელი',
      description: 'აღწერა',
      price: 'ფასი',
      uploadImage: 'სურათის ატვირთვა',
      add: 'დამატება',
      cancel: 'გაუქმება',
      addToCart: 'კალათაში დამატება',
      soldBy: 'გამყიდველი',
      loading: 'იტვირთება...',
      search: 'ძებნა',
      category: 'კატეგორია',
      allCategories: 'ყველა კატეგორია',
      sortBy: 'დალაგება',
      priceRange: 'ფასის დიაპაზონი'
    },
    cart: {
      empty: 'თქვენი კალათა ცარიელია',
      continueShopping: 'შოპინგის გაგრძელება',
      total: 'ჯამი',
      checkout: 'შეკვეთა',
      remove: 'წაშლა',
      quantity: 'რაოდენობა',
      subtotal: 'ქვეჯამი'
    },
    auth: {
      email: 'ელ-ფოსტა',
      password: 'პაროლი',
      name: 'სახელი',
      isSeller: 'გამყიდველი ხართ?',
      loginButton: 'შესვლა',
      registerButton: 'რეგისტრაცია',
      confirmPassword: 'გაიმეორეთ პაროლი',
      storeName: 'მაღაზიის სახელი',
      storeDescription: 'მაღაზიის აღწერა',
      phone: 'ტელეფონი',
      address: 'მისამართი',
      welcomeBack: 'მოგესალმებით',
      createAccount: 'ანგარიშის შექმნა',
      userType: 'მომხმარებლის ტიპი',
      user: 'მომხმარებელი',
      seller: 'გამყიდველი',
      alreadyHaveAccount: 'უკვე გაქვთ ანგარიში? შესვლა',
      dontHaveAccount: 'არ გაქვთ ანგარიში? რეგისტრაცია'
    }
  },
  en: {
    // English
    home: {
      welcome: 'Welcome to Our Shop',
      discover: 'Discover amazing products at great prices',
      shopNow: 'Shop Now'
    },
    nav: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      myStore: 'My Store',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      settings: 'Settings'
    },
    products: {
      addProduct: 'Add Product',
      productName: 'Product Name',
      description: 'Description',
      price: 'Price',
      uploadImage: 'Upload Image',
      add: 'Add',
      cancel: 'Cancel',
      addToCart: 'Add to Cart',
      soldBy: 'Sold by',
      loading: 'Loading...',
      search: 'Search',
      category: 'Category',
      allCategories: 'All Categories',
      sortBy: 'Sort by',
      priceRange: 'Price Range'
    },
    cart: {
      empty: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove',
      quantity: 'Quantity',
      subtotal: 'Subtotal'
    },
    auth: {
      email: 'Email',
      password: 'Password',
      name: 'Name',
      isSeller: 'Are you a seller?',
      loginButton: 'Login',
      registerButton: 'Register',
      confirmPassword: 'Confirm Password',
      storeName: 'Store Name',
      storeDescription: 'Store Description',
      phone: 'Phone',
      address: 'Address',
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      userType: 'User Type',
      user: 'User',
      seller: 'Seller',
      alreadyHaveAccount: 'Already have an account? Sign In',
      dontHaveAccount: 'Don\'t have an account? Register'
    }
  },
  ru: {
    // Russian
    home: {
      welcome: 'Добро пожаловать в наш магазин',
      discover: 'Откройте для себя удивительные товары по отличным ценам',
      shopNow: 'Купить сейчас'
    },
    nav: {
      home: 'Главная',
      products: 'Товары',
      cart: 'Корзина',
      myStore: 'Мой Магазин',
      login: 'Вход',
      register: 'Регистрация',
      logout: 'Выход',
      settings: 'Настройки'
    },
    products: {
      addProduct: 'Добавить Товар',
      productName: 'Название Товара',
      description: 'Описание',
      price: 'Цена',
      uploadImage: 'Загрузить Изображение',
      add: 'Добавить',
      cancel: 'Отмена',
      addToCart: 'В Корзину',
      soldBy: 'Продавец',
      loading: 'Загрузка...',
      search: 'Поиск',
      category: 'Категория',
      allCategories: 'Все Категории',
      sortBy: 'Сортировать по',
      priceRange: 'Ценовой Диапазон'
    },
    cart: {
      empty: 'Ваша корзина пуста',
      continueShopping: 'Продолжить Покупки',
      total: 'Итого',
      checkout: 'Оформить Заказ',
      remove: 'Удалить',
      quantity: 'Количество',
      subtotal: 'Подытог'
    },
    auth: {
      email: 'Эл. почта',
      password: 'Пароль',
      name: 'Имя',
      isSeller: 'Вы продавец?',
      loginButton: 'Войти',
      registerButton: 'Зарегистрироваться',
      confirmPassword: 'Подтвердите Пароль',
      storeName: 'Название Магазина',
      storeDescription: 'Описание Магазина',
      phone: 'Телефон',
      address: 'Адрес',
      welcomeBack: 'С Возвращением',
      createAccount: 'Создать Аккаунт',
      userType: 'Тип Пользователя',
      user: 'Пользователь',
      seller: 'Продавец',
      alreadyHaveAccount: 'Уже есть аккаунт? Войти',
      dontHaveAccount: 'Нет аккаунта? Зарегистрироваться'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Try to get the language from localStorage, default to Georgian
    return localStorage.getItem('language') || 'ka';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (section, key) => translations[language]?.[section]?.[key] || translations.ka[section][key]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 