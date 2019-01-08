//
const navListSortableOptions = {
  sort: true,
  animation: 150,
  handle: ".navigation-list .holder",
  onUpdate: function (evt) {
    console.log('Navigation Order has changed!')
  }
}

const cardListSortableOptions = {
  sort: true,
  animation: 150,
  handle: ".card-list-item .holder",
  onUpdate: function (evt) {
    console.log('Card List Order has changed!')
  }
}

const tableSortableOptions = {
  sort: true,
  animation: 150,
  handle: ".holder",
  onUpdate: function (evt) {
    console.log('Table Order has changed!')
  }
}


//
const fixBundle = {
    enableTooltips: (sel) => {
      $(sel).tooltip();
    },
    enableCardListSortable: (sel) => {
      const el = document.querySelector(sel);
      const cardListSortable = new Sortable.create(el, cardListSortableOptions);
    },
    enableSortable: (sel) => {
      const el = document.querySelectorAll(sel);
      el.forEach((el) => {
        Sortable.create(el, tableSortableOptions);
      });
    },
    enableDatePicker: (sel) => {
      const arr = document.querySelectorAll(sel);
      console.log(arr);
      arr.forEach((el) => {
        let dateType = "";
        if(el.classList.contains('fp-year')) {
          dateType = "Y"
        } else {
          dateType = "d-m-Y"
        }
        flatpickr(el, {
          dateFormat: dateType,
          "locale": 'tr',

        });
      });
    }
}

//
// for Tooltips
if (document.querySelector('[data-toggle="tooltip"]')) {
  fixBundle.enableTooltips('[data-toggle="tooltip"]');
}

// Navigaiton List
if (document.querySelector('.navigation-list')) {
  fixBundle.enableNavListSortable('.navigation-list');
}


// Card List
if (document.querySelector('.card-list')) {
  fixBundle.enableCardListSortable('.card-list');

  // SweetAlert
  document.querySelectorAll('.card-list-item-overlay').forEach((el) => {
    el.querySelector('.btn-danger').addEventListener('click', () => {
      swal({
        title: 'Silmek istediğinize emin misiniz?',
        text: 'Bu işlemin geri dönüşü yoktur. Silmek yerine "Düzenle/Yayından Kaldır" seçeneği ile web sitesi ziyaretçileriniz görüntülemesini engelleyebilirsiniz.',
        dangerMode: true,
        buttons: {
          cancel: {
            text: "Vazgeç",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Sil",
            value: true,
            visible: true,
            className: "",
            closeModal: false
          }
        },
        // icon: "warning" // "warning" , "error", "info", "success"
      });
    });
  });
}

// Table
if (document.querySelector('.fix-list-group-sortable')) {
  fixBundle.enableSortable('.fix-list-group-sortable');
}

// DatePicker
if (document.querySelector('input[type="date"]')) {
  fixBundle.enableDatePicker('input[type="date"]');
}

//
if (document.querySelector('.form-group-list')) {
  fixBundle.enableSortable('.form-group-list');
}

//
if (document.querySelector('.gallery-list')) {
  fixBundle.enableSortable('.gallery-list');
}

if (document.querySelector('.mediumeditor')) {
  const mediumEditorElements = document.querySelectorAll('.mediumeditor');
  const editor = new MediumEditor(mediumEditorElements, {
    toolbar: {
      buttons: ['bold', 'italic', 'underline', 'anchor', 'subscript', 'superscript', 'h2', 'h3', 'unorderedlist'],
      align: 'left',
      paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta'],
        unwrapTags: ['sub', 'sup']
      },
      placeholder: {
        text: 'İçerik girişi yapmak için tıklayınız',
        hideOnClick: true
      },
      anchorPreview: true,
      autoLink: true
    }
  });
}





