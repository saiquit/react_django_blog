from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2


class StandardResultsLimitPagination(LimitOffsetPagination):
    default_limit = 2
    max_limit = 2
