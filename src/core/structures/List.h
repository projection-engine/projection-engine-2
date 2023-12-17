#ifndef PROJECTION_ENGINE_LIST_H
#define PROJECTION_ENGINE_LIST_H

namespace PEngine {
    template<typename T>
    struct ListItem {
        T *value;
        ListItem *next;
        ListItem *previous;

        explicit ListItem(T *value) : value(value), next(nullptr), previous(nullptr) {}
    };

    template<typename T>
    class List {
    private:
        ListItem<T> *head{};
        ListItem<T> *tail{};
        ListItem<T> *iterator{};
        size_t length = 0;
    public:
        List() {
            head = nullptr;
            tail = nullptr;
            iterator = nullptr;
        }

        ~List() {
            clear();
        }

        void clear() {
            ListItem<T> *current = head;
            while (current != nullptr) {
                ListItem<T> *temp = current;
                current = current->next;
                delete temp;
            }
        }

        size_t getLength() {
            return length;
        }

        T *get(size_t index) {
            if (index >= length) {
                return nullptr;
            }
            ListItem<T> *item = getItem(index);
            if (item != nullptr) {
                return item->value;
            }
            return nullptr;
        }

        ListItem<T> *getItem(size_t index) {
            int i = 0;
            ListItem<T> *current = head;
            while (i < index && current != nullptr) {
                i++;
                current = current->next;
            }
            return current;
        }

        void remove(T *item) {
            ListItem<T> *current = head;

            while (current) {
                if (current->value == item) {
                    if (current->previous) {
                        current->previous->next = current->next;
                    } else {
                        head = current->next;
                    }

                    if (current->next) {
                        current->next->previous = current->previous;
                    } else {
                        tail = current->previous;
                    }

                    delete current;
                    length--;
                    return;
                }
                current = current->next;
            }
        }

        void replaceAt(size_t index, T *value) {
            ListItem<T> *pItem = getItem(index);
            if (pItem != nullptr) {
                pItem->value = value;
            }
        }

        void removeAt(size_t index) {
            ListItem<T> *current = head;
            int currentIndex = 0;

            while (current && currentIndex < index) {
                current = current->next;
                currentIndex++;
            }

            if (current) {
                if (current->previous) {
                    current->previous->next = current->next;
                } else {
                    head = current->next;
                }

                if (current->next) {
                    current->next->previous = current->previous;
                } else {
                    tail = current->previous;
                }

                delete current;
                length--;
            }
        }

        bool includes(T *item) {
            ListItem<T> *current = head;
            while (current != nullptr) {
                if (current->value == item) {
                    return true;
                } else {
                    current = current->next;
                }
            }
            return false;
        }

        int indexOf(T *item) {
            int i = 0;
            ListItem<T> *current = head;

            while (current != nullptr) {
                if (current->value == item) {
                    return i;
                } else {
                    i++;
                    current = current->next;
                }
            }
            return -1;
        }

        void push(T *item) {
            ListItem<T> *newNode = new ListItem(item);

            if (!head) {
                head = newNode;
                tail = newNode;
            } else {
                newNode->previous = tail;
                tail->next = newNode;
                tail = newNode;
            }
            length++;
        }

        void pop() {
            if (tail) {
                ListItem<T> *prevTail = tail->previous;
                if (prevTail) {
                    prevTail->next = nullptr;
                    delete tail;
                    tail = prevTail;
                } else {
                    delete tail;
                    head = nullptr;
                    tail = nullptr;
                }
            }
            length--;
        }

        void iterate() {
            iterator = head;
        }

        bool hasNext() {
            return iterator != nullptr;
        }

        T *next() {
            if (iterator == nullptr) {
                return nullptr;
            }
            T *value = iterator->value;
            iterator = iterator->next;
            return value;
        }

        ListItem<T> *getFirst() {
            return head;
        }

        ListItem<T> *getLast() {
            return tail;
        }

        T *getFirstValue() {
            if (head == nullptr)
                return nullptr;
            return head->value;
        }

        T *getLastValue() {
            if (tail == nullptr)
                return nullptr;
            return tail->value;
        }
    };
}

#endif