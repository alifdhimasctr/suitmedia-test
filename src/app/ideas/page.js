"use client"

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams, usePathname } from 'next/navigation';

function IdeasContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSize = parseInt(searchParams.get('size')) || 10;
  const initialSort = searchParams.get('sort') || '-published_at';

  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
        params: {
          'page[number]': page,
          'page[size]': size,
          append: ['small_image', 'medium_image'],
          sort: sort,
        },
      });

      const data = response.data.data;
      const meta = response.data.meta;

      setIdeas(data);
      setTotalItems(meta.total);
      setTotalPages(Math.ceil(meta.total / size));
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, size, sort]);

  const updateUrlParams = (newParams) => {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newParams) {
      if (newParams[key] !== undefined) {
        searchParams.set(key, newParams[key]);
      }
    }
    const newUrl = `${pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    setPage(1);
    updateUrlParams({ sort: newSort, page: 1 });
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setPage(1);
    updateUrlParams({ size: newSize, page: 1 });
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
    updateUrlParams({ page: pageNumber });
  };

  const renderPagination = () => {
    const paginationItems = [];
    
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`border px-3 py-1 mr-2 rounded-lg ${i === page ? 'bg-orange-600 text-white' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (page > 2) {
        paginationItems.push(
          <button
            key={1}
            onClick={() => goToPage(1)}
            className={`border px-3 py-1 mr-2 rounded-lg ${1 === page ? 'bg-orange-600 text-white' : ''}`}
          >
            1
          </button>
        );

        if (page > 3) {
          paginationItems.push(<span key="dots1" className="px-3 py-1">...</span>);
        }
      }

      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`border px-3 py-1 mr-2 rounded-lg ${i === page ? 'bg-orange-600 text-white' : ''}`}
          >
            {i}
          </button>
        );
      }

      if (page < totalPages - 2) {
        if (page < totalPages - 3) {
          paginationItems.push(<span key="dots2" className="px-3 py-1">...</span>);
        }

        paginationItems.push(
          <button
            key={totalPages}
            onClick={() => goToPage(totalPages)}
            className={`border px-3 py-1 rounded-lg ${totalPages === page ? 'bg-orange-600 text-white' : ''}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return paginationItems;
  };

  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);

  return (
    <div>
      <div className="relative">
        <div
          className="bg-gradient-to-tr from-blue-500 to-purple-700 h-80 relative"
          style={{
            clipPath: 'polygon(0 0%, 100% 0%, 100% 75%, 0% 100%)',
          }}
        >
          <div className="text-white text-3xl md:text-5xl font-bold flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold">Ideas</h1>
              <p className="text-lg md:text-2xl">We have a lot of ideas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center">
          <p className='text-black text-xs md:text-sm'>Showing {startItem}-{endItem} of {totalItems}</p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="flex items-center gap-2">
              <p className='text-black text-xs md:text-sm'>Show per page</p>
              <select value={size} onChange={handleSizeChange} className="select-xs md:select-sm bg-white border-2 border-gray-400 rounded-full hover:bg-gray-50">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <p className='text-black text-xs md:text-sm'>Sort by</p>
              <select value={sort} onChange={handleSortChange} className="select-xs md:select-sm bg-white border-2 border-gray-400 rounded-full hover:bg-gray-50">
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="border shadow-lg rounded-lg p-4">
              <img
                src={idea.medium_image.url}
                alt={idea.title}
                className="w-full h-32 sm:h-48 object-cover mb-4"
                loading="lazy"
              />
              <p className='text-sm'>{new Date(idea.published_at).toLocaleDateString()}</p>
              <h2 className="text-md md:text-lg font-bold text-black line-clamp-3">{idea.title}</h2>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="border px-2 py-1 mr-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="border px-2 py-1 ml-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Ideas() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IdeasContent />
    </Suspense>
  );
}
