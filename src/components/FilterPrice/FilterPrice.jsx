import Select from 'react-select';

const options = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'under5', label: 'Dưới 5 triệu' },
    { value: '5to10', label: 'Từ 5 – 10 triệu' },
    { value: 'over10', label: 'Trên 10 triệu' },
];

const FilterPrice = ({ value, onChange }) => {
    const selected = options.find((opt) => opt.value === value);

    return (
        <div className="mb-3" style={{ maxWidth: 250 }}>
            <Select
                value={selected}
                onChange={(option) => onChange(option.value)}
                options={options}
                isSearchable={false}
                placeholder="Chọn mức giá"
            />
        </div>
    );
};

export default FilterPrice;
