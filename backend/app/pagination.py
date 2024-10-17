import os
import logging
from rest_framework.pagination import PageNumberPagination

logger = logging.getLogger(__name__)

class CustomPageNumberPagination(PageNumberPagination):
    MAX_PAGE_SIZE = int(os.getenv("MAX_PAGE_SIZE", 10))  # Convert to int immediately

    def __init__(self):
        super().__init__()
        self.page_size = self.MAX_PAGE_SIZE  # Set default page_size

    def get_page_size(self, request):
        page_size = request.query_params.get('page_size', None)
        if page_size is not None:
            try:
                page_size = int(page_size)
                if page_size > 0:
                    return min(page_size, self.MAX_PAGE_SIZE)
            except (ValueError, TypeError):
                logger.warning(f"Invalid page_size parameter: {page_size}")  # Log the error
        return self.page_size  # Default to the class's page_size
