<template>
    <footer :text="['center', 'lg-start']" class="footer">
      <div class="text-center p-3">
        © 2023 Copyright: Zontec
        <!-- <a style="color: white;" href="https://roboflex.com.br/" target="_blank">Roboflex</a> -->
      </div>
    </footer>
  </template>
  
  <style >
  .footer {
    width: 100%;
    background: linear-gradient(180deg, #2D2D2D 0%, #282929 51.54%, #181818 100%);
    color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  
  @media (max-width: 576px) {
    .footer {
      font-size: 14px;
    }
  }
  
  @media (min-width: 577px) and (max-width: 991px) {
    .footer {
      font-size: 16px;
    }
  }
  
  @media (min-width: 992px) {
    .footer {
      font-size: 18px;
    }
  }
  </style>
  