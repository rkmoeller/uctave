import { Search } from 'lucide-react';
import { Input } from './Input';
import { Input as BaseInput } from '@base-ui/react/input';

export const SearchInput = (props: BaseInput.Props) => {
    return <Input icon={<Search size={14} className="text-zinc-600" />} {...props} />;
};
