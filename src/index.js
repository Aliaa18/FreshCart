import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { QueryClient , QueryClientProvider  } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import App from './App';
let queryClient= new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools postion="bottom-right" initialIsOpen="false"/>
</QueryClientProvider>

   

);

